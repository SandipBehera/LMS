import React, { useRef, useState } from "react";
import { Button, Input, Tooltip } from "reactstrap";
import { DownloadPath, WebApi } from "../../api";
import { toast } from "react-toastify";

const BulkUpload = ({ filetype, extension }) => {
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  // Function to open the file window when the button is clicked
  const openFileWindow = () => {
    // Access the file input element and trigger a click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOpenDownload, setTooltipOpenDownload] = useState(false);
  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };
  const toggleTooltipDownload = () => {
    setTooltipOpenDownload(!tooltipOpenDownload);
  };
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Handle the selected file
      if (filetype === "category") {
        if (selectedFile.name.split(".").pop() !== extension) {
          alert(`Invalid file format. Please upload a ${extension} file`);
          return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch(`${WebApi}/upload-category`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Cookie: document.cookie,
          },
          body: formData,
        });
        if (response.status === "success") {
          toast.success(response.message);
        } else {
          toast.error("Failed to upload file");
        }
      } else {
        if (selectedFile.name.split(".").pop() !== extension) {
          alert(`Invalid file format. Please upload a ${extension} file`);
          return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch(`${WebApi}/upload-location`, {
          method: "POST",
          credentials: "include",
          headers: {
            Cookie: document.cookie,
          },
          body: formData,
        });
        if (response.status === "success") {
          toast.success(response.message);
        } else {
          toast.error("Failed to upload file");
        }
      }
    }
  };

  const downloadSampleFile = async () => {
    try {
      // Make a GET request to the server route for downloading the file
      const response = await fetch(
        `${WebApi}/download/${filetype}/extension/${extension}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            responseType: "blob",
            Cookie: document.cookie,
          }, // Set responseType to 'blob' for binary data
        }
      );

      // Check if the request was successful (status code 200)
      if (response.ok) {
        // Convert the response to a blob
        const blob = await response.blob();

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);

        // Set the filename for the downloaded file
        link.download = `${filetype}_sample.${extension}`;

        // Trigger a click event on the link to start the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error(
          "Failed to download file:",
          response.status,
          response.statusText
        );
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      // Handle the error as needed
    }
  };
  return (
    <div className="d-flex justify-content-end align-items-center m-4">
      <Button
        class="btn"
        onClick={openFileWindow}
        color="primary"
        id="uploadIcon"
      >
        <i className="fa fa-upload"></i>
        <Tooltip
          placement="bottom"
          isOpen={tooltipOpen}
          target="uploadIcon"
          toggle={toggleTooltip}
        >
          Upload Bulk {filetype} File
        </Tooltip>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <Button
        className="mx-4"
        color="success"
        id="downloadIcon"
        onClick={downloadSampleFile}
      >
        <i className="fa fa-download"></i>
        <Tooltip
          placement="bottom"
          isOpen={tooltipOpenDownload}
          target="downloadIcon"
          toggle={toggleTooltipDownload}
        >
          Download {filetype} Sample File
        </Tooltip>
      </Button>
      <Input
        className="mx-4"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "250px" }} // Adjust the width as needed
      />
    </div>
  );
};

export default BulkUpload;
