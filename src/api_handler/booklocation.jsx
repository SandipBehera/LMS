import React from "react";
import { LocalApi, WebApi } from "../api";
import { branchID } from "../Constant";

export const Add_Book_Location = async (
  block,
  shelf_name,
  rack_name,
  sub_rack_name,
  status
) => {
  return await fetch(`${WebApi}/create-book-location`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
    body: JSON.stringify({
      block: block,
      shelf_name: shelf_name,
      rack_name: rack_name,
      sub_rack_name: sub_rack_name,
      status: status,
      branch_id: branchID,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
};

export const GetAllBookLocation = async () => {
  return await fetch(`${WebApi}/get-all-locations/${branchID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      cookie: document.cookie,
    },
  }).then((response) => response.json());
};

export const GetBlock = async () => {
  return await fetch(`${WebApi}/get-blocks/${branchID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      cookie: document.cookie,
    },
  }).then((response) => response.json());
};

export const UpdateBookLocation = async (
  id,
  block,
  shelf_name,
  rack_name,
  sub_rack_name,
  status
) => {
  return await fetch(`${WebApi}/update-book-location/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
    body: JSON.stringify({
      block: block,
      shelf_name: shelf_name,
      rack_name: rack_name,
      sub_rack_name: sub_rack_name,
      status: status,
      branch_id: branchID,
    }),
  }).then((response) => {
    return response.json();
  });
};
