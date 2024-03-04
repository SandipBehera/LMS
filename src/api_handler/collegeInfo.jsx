// Code: API calls for fetching college information
import { branchID } from "../Constant";
import { WebApi } from "../api";

export async function departmentInfo() {
  return await fetch(`${WebApi}/get-departments/${branchID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function programYear() {
  return await fetch(`${WebApi}/get-program-years/${branchID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function vendorList() {
  return await fetch(`${WebApi}/get-vendors/${branchID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function programList() {
  return await fetch(`${WebApi}/get-programs/${branchID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export async function subjectList() {
  return await fetch(`${WebApi}/get-subjects/${branchID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
export async function languageList() {
  return await fetch(`${WebApi}/get-languages`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: document.cookie,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
