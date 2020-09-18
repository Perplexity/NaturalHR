import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../authSlice";
import { getUploads, setSelectedFile, uploadFile } from "./homeSlice";
import UploadsTable from "../../components/UploadsTable";
import { Button, Card, Form, InputGroup, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Errors from "../../components/Errors";

const Home = (props) => {
  const { auth, dispatch, uploads, loading, selectedFile, uploading, errors } = props;
  useEffect(() => {
    dispatch(getUploads());
  }, []);
  console.log(props, "home props");
  return (
    <div>
      <h1>Welcome back, {auth.user.Username}!</h1>
      <div>
        <Card>
          <Card.Header>Uploads</Card.Header>
          <Card.Body>
          { loading ? <Spinner animation="border" /> : <UploadsTable uploads={uploads} />}
            <Card.Title>Upload a file</Card.Title>
            <Form onSubmit={(e) => {
              e.preventDefault();
              dispatch(uploadFile());
            }}>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="file">
                      <FontAwesomeIcon icon={faFile} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.File label={selectedFile ? selectedFile.name : "Choose a file..."} onChange={(e) => {
                    dispatch(setSelectedFile(e.target.files[0]));
                  }} custom/>
                </InputGroup>
              </Form.Group>
              <div>
                {uploading ? <Spinner animation="border"/> : <Button style={{width: "100%"}} type="submit">Upload file</Button>}
                {errors.upload && <Errors errors={[errors.upload]}/>}
              </div>
            </Form>
          </Card.Body>
        </Card>
        <Button variant="danger" style={{width: "100%"}} onClick={() => dispatch(logout())}>Logout</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth, ...state.home };
};
export default connect(mapStateToProps)(Home);
