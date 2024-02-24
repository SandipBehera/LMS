import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Label,
  CardHeader,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { Breadcrumbs } from "../../../AbstractElements";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { Add_Book_Location, GetBlock } from "../../../api_handler/booklocation";
import { toast } from "react-toastify";

export default function BookLocation() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [resetFlag, setResetFlag] = useState(false);
  const userTypes = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const [block, setBlock] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetBlock(); // Call GetAllBookLocation function
        console.log(response.categories);
        setBlock(response.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, show an error message, etc.
      }
    }
    fetchData();
  }, []);

  const onSubmit = (data) => {
    Add_Book_Location(
      data.blockName,
      data.rack,
      data.status,
      data.subRack
    ).then((res) => {
      console.log("first", res);
      if (res.status === "success") {
        toast.success(res.message);
        // window.location.replace(
        //   `/lms/${userTypes}/${userId}/all-book-location`
        // );
      } else if (res.status === "error") {
        toast.error(res.message);
      }
    });
  };

  const handleCancel = () => {
    setResetFlag(true);
    setTimeout(() => {
      setResetFlag(false);
      setValue("blockName", "");
      setValue("shelfName", "");
      setValue("rack", "");
      setValue("subRack", "");
      setValue("status", "");
    }, 0);
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Admin"
        mainTitle="Book Location"
        subParent="Add Location"
        title="Add Book Location"
      />
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Row className="p-2">
                <Col md={6}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Block
                  </Label>
                  <Controller
                    name="blockName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <select {...field} className="form-control">
                          <option value="">Select Block</option>
                          {block.map((b) => {
                            return (
                              <option key={b.id} value={b.block_name}>
                                {b.block_name}
                              </option>
                            );
                          })}
                        </select>
                      </>
                    )}
                  />

                  {errors.blockName?.type === "required" && (
                    <p className="text-danger">Block name is required</p>
                  )}
                </Col>

                <Col md={6}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Shelf Name
                  </Label>
                  <Controller
                    name="shelfName"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 10,
                      pattern: /^[A-Za-z]+$/i,
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          className="form-control"
                          maxLength={10}
                        />
                      </>
                    )}
                  />
                  {errors.shelfName?.type === "required" && (
                    <p className="text-danger">Shelf Name is required</p>
                  )}
                  {errors.shelfName?.type === "maxLength" && (
                    <p className="text-danger">
                      Shelf name should be maximum 10 characters
                    </p>
                  )}
                  {errors.shelfName?.type === "pattern" && (
                    <p className="text-danger">Alphabetical characters only</p>
                  )}
                </Col>
              </Row>

              <Row className="p-2">
                <Col md={6}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Rack Name
                  </Label>
                  <Controller
                    name="rack"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 10,
                      pattern: /^[A-Za-z]+$/i,
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          className="form-control"
                          maxLength={10}
                        />
                      </>
                    )}
                  />
                  {errors.rack?.type === "required" && (
                    <p className="text-danger">Rack Name is required</p>
                  )}
                  {errors.rack?.type === "maxLength" && (
                    <p className="text-danger">
                      Rack name should be maximum 10 characters
                    </p>
                  )}
                  {errors.rack?.type === "pattern" && (
                    <p className="text-danger">Alphabetical characters only</p>
                  )}
                </Col>
                <Col md={6}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Sub Rack Name
                  </Label>
                  <Controller
                    name="subRack"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 10,
                      pattern: /^[A-Za-z]+$/i,
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          className="form-control"
                          maxLength={10}
                        />
                      </>
                    )}
                  />
                  {errors.subRack?.type === "required" && (
                    <p className="text-danger">Sub rack name is required</p>
                  )}
                  {errors.subRack?.type === "maxLength" && (
                    <p className="text-danger">
                      Sub rack name should be maximum 10 characters
                    </p>
                  )}
                  {errors.subRack?.type === "pattern" && (
                    <p className="text-danger">Alphabetical characters only</p>
                  )}
                </Col>
              </Row>
              <Row className="p-2">
                <Col md={6}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Status
                  </Label>
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <select {...field} className="form-control">
                          <option value="">Select Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </>
                    )}
                  />
                  {errors.status?.type === "required" && (
                    <p className="text-danger">Status is required</p>
                  )}
                </Col>
              </Row>
            </FormGroup>
            <Button
              type="submit"
              color="success"
              className="mt-2 ml-3 btn-success mr-2"
            >
              Save
            </Button>{" "}
            <Button
              type="button"
              color="danger"
              onClick={handleCancel}
              className="mt-2 ml-3 btn-danger"
            >
              Cancel
            </Button>
          </form>
        </CardBody>
      </Card>
    </Fragment>
  );
}
