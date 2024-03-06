import React, { Fragment, useEffect, useState } from "react";
import { Breadcrumbs } from "../../../../AbstractElements";
import { useLocation } from "react-router-dom";
import { Button, Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { vendorList } from "../../../../api_handler/collegeInfo";
import {
  Add_Book_Inventory,
  getItemCode,
} from "../../../../api_handler/bookInventory";
import { branchID, userId, userType } from "../../../../Constant";
import { toast } from "react-toastify";
import useInitials from "../../../../Layout/getInitialsHook/GetInitials";

export default function BookInventory() {
  const location = useLocation();
  const { bookDetails } = location.state || {};
  const [itemCode, setItemCode] = useState("");
  const initials = useInitials(bookDetails.book_name);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [generatedItemCode, setGeneratedItemCode] = useState("");
  useEffect(() => {
    setValue("itemCode", generatedItemCode);
    setValue("vendor", bookDetails.book_vendor);
    setValue("itemCode", itemCode.itemCode || generatedItemCode);
  });
  useEffect(() => {
    getItemCode(bookDetails.id, branchID).then((data) => {
      setItemCode(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    const generateRandomCode = () => {
      const randomCode = initials + Math.floor(Math.random() * 10000);
      setGeneratedItemCode(randomCode);
    };

    if (initials && itemCode?.duplicate === "false") {
      generateRandomCode();
    }
    if (itemCode?.itemCode) {
      setGeneratedItemCode(itemCode?.itemCode);
    }
  }, [initials, itemCode]);

  const onSubmit = (data) => {
    Add_Book_Inventory(
      bookDetails.book_vendor,
      data.itemCode,
      data.totalUnits,
      bookDetails.id,
      branchID
    ).then((res) => {
      if (res.status === "success") {
        toast.success(res.message);
        window.location.replace(`/lms/${userType}/${userId}/view-books`);
      } else if (res.status === "error") {
        toast.error(res.message);
      }
    });
  };

  return (
    <Fragment>
      <Breadcrumbs
        parent="Add Book Inventory"
        mainTitle="Add Inventory"
        title="Add Book Inventory"
      />
      <Card className="p-4">
        <div className="d-flex justify-content-around mx-4">
          <div className="text-center">
            <span
              className="font-size font-weight-bold text-center"
              style={{ fontWeight: "bold" }}
            >
              Book Title:
            </span>{" "}
            <span>{bookDetails.book_name}</span>
          </div>
          <div className="text-center">
            <span
              className="font-size font-weight-bold"
              style={{ fontWeight: "bold" }}
            >
              Material Type:
            </span>{" "}
            <span>{bookDetails.book_material_type}</span>
          </div>
        </div>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Row className="p-2">
                <Col md={6}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Vendor
                  </Label>
                  <Controller
                    name="vendor"
                    control={control}
                    defaultValue={bookDetails.book_vendor}
                    rules={{ required: true }}
                    render={({ field }) => (
                      // <select {...field} className="form-control" disabled>
                      //   <option value="">Select Vendor</option>
                      //   {vendors.map((vendor) => (
                      //     <option key={vendor.id} value={vendor.vendor_name}>
                      //       {vendor.vendor_name}
                      //     </option>
                      //   ))}
                      // </select>
                      <input
                        {...field}
                        className="form-control"
                        maxLength={20}
                        disabled
                      />
                    )}
                  />
                  {errors.vendor?.type === "required" && (
                    <p className="text-danger">Book vendor is required</p>
                  )}
                </Col>

                <Col md={6}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Total Units
                  </Label>
                  <Controller
                    name="totalUnits"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 20,
                      pattern: /^[0-9.]+$/i,
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="form-control"
                        maxLength={20}
                      />
                    )}
                  />
                  {errors.totalUnits?.type === "required" && (
                    <p className="text-danger">Book total units is required</p>
                  )}
                  {errors.totalUnits?.type === "maxLength" && (
                    <p className="text-danger">
                      Book total units should be maximum 20 characters
                    </p>
                  )}
                  {errors.totalUnits?.type === "pattern" && (
                    <p className="text-danger">Numbers only</p>
                  )}
                </Col>
              </Row>
              <Row className="p-2">
                <Col md={6}>
                  <Label
                    className="font-size font-weight-bold"
                    style={{ fontWeight: "bold" }}
                  >
                    Item Code
                  </Label>
                  <Controller
                    name="itemCode"
                    control={control}
                    defaultValue={itemCode?.itemCode}
                    value={generatedItemCode} // Set defaultValue here
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <input {...field} className="form-control" disabled />
                    )}
                  />
                  {errors.itemCode?.type === "required" && (
                    <p className="text-danger">Item code is required</p>
                  )}
                  {errors.itemCode?.type === "maxLength" && (
                    <p className="text-danger">
                      Item code should be maximum 20 characters
                    </p>
                  )}
                  {errors.itemCode?.type === "pattern" && (
                    <p className="text-danger">Numbers only</p>
                  )}
                </Col>
              </Row>
            </FormGroup>
            <div className="d-flex justify-content-end">
              <Button type="submit" color="white">
                <FaRegArrowAltCircleRight style={{ fontSize: "3rem" }} />
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </Fragment>
  );
}
