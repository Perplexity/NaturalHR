import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

//UploadsTable component to render user uploads, also uses momentjs to format dates.

export default (props) => {
  const { uploads } = props;
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>File Name</th>
          <th>File Size</th>
          <th>Date Uploaded</th>
        </tr>
      </thead>
      <tbody>
        {uploads.length > 0 ? (
          uploads.map((upload) => {
            return (
              <tr key={upload.Id}>
                <td>{upload.FileName}</td>
                <td>{parseInt(upload.FileSize) / 1000}kb</td>
                <td>
                  {moment(upload.DateUploaded).format("DD/MM/YYYY HH:mm:ss")}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              <h6>No files uploaded yet.</h6>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
