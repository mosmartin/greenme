import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as moment from "moment";
import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  ModalFooter,
  Table,
  FormFeedback,
  Button,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap";
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
} from "../../slices/thunks";
import avatar from "../../assets/images/avatar-6.jpg";
import { isEmpty } from "lodash";
import TableContainer from "../../Components/Common/TableContainer";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import Layouts from "../../Layouts";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import dummyImg from "../../assets/images/users/user-dummy-img.jpg";
import { Link, NavLink } from "react-router-dom";
const arr = [
  {
    _id: "625d3cd5923ccd040209ebf1",
    name: "Michael Morris",
    email: "45%",
    Email: "Benchmark 1",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. A",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebf3",
    name: "Kevin Dawson",
    email: "10%",
    Email: "Benchmark 2",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. B",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebee",
    name: "James Price",
    email: "100%",
    Email: "Benchmark 3",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. C",
    tags: "Completed",
  },
  {
    _id: "625d3cd5923ccd040209ebf0",
    name: "Herbert Stokes",
    email: "80%",
    Email: "Benchmark 4",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. D",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebf2",
    name: "Timothy Smith",
    email: "0%",
    Email: "Benchmark 5",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. E",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebeb",
    name: "Thomas Taylor",
    company: "iTest Factory",
    designation: "UI / UX Designer",
    email: "45%",
    Email: "Benchmark 6",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. F",
    tags: "progress",
  },
  {
    _id: "625d3cd5923ccd040209ebec",
    name: "Nancy Martino",
    company: "Force Medicines",
    designation: "PHP Developer",
    email: "70%",
    Email: "Benchmark 7",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. G",
    tags: "Inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebea",
    name: "Tonya Noble 123",
    company: "Nesta Technologies",
    designation: "Lead Designer / Developer",
    email: "100%",
    Email: "Benchmark 8",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. H",
    tags: "Completed",
  },
  {
    _id: "625d3cd5923ccd040209ebef",
    name: "Mary Cousar",
    company: "Micro Design",
    designation: "Asp.Net Developer",
    email: "20%",
    Email: "Benchmark 9",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. I",
    tags: "inprogress",
  },
  {
    _id: "625d3cd5923ccd040209ebed",
    name: "Alexis Clarke",
    company: "Digitech Galaxy",
    designation: "Full Stack Developer",
    email: "10%",
    Email: "Benchmark 10",
    last_contacted: "2010-11-05T00:00:02.016Z",
    lead_score: "FleetMGT Co. J",
    tags: "Inprogress",
  },
];
const BenchmarkAdmin = () => {
  const dispatch = useDispatch();
  const { crmcontacts, isContactCreated, isContactSuccess, error } =
    useSelector((state) => ({
      crmcontacts: state.Crm.crmcontacts,
      isContactCreated: state.Crm.isContactCreated,
      isContactSuccess: state.Crm.isContactSuccess,
      error: state.Crm.error,
    }));
  useEffect(() => {
    dispatch(onGetContacts(arr));
  }, [dispatch, crmcontacts]);
  useEffect(() => {
    setContact(crmcontacts);
  }, [crmcontacts]);

  useEffect(() => {
    if (!isEmpty(crmcontacts)) {
      setContact(crmcontacts);
      setIsEdit(false);
    }
  }, [crmcontacts]);

  const [isEdit, setIsEdit] = useState(false);
  const [contact, setContact] = useState([]);

  //delete Conatct
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setContact(null);
    } else {
      setModal(true);
      setTag([]);
      setAssignTag([]);
    }
  }, [modal]);

  // Delete Data
  const handleDeleteContact = () => {
    if (contact) {
      dispatch(onDeleteContact(contact._id));
      setDeleteModal(false);
    }
  };

  const onClickDelete = (contact) => {
    setContact(contact);
    setDeleteModal(true);
  };

  // Add Data
  const handleContactClicks = () => {
    setContact("");
    setIsEdit(false);
    toggle();
  };

  // Date & Time Format

  const dateFormat = () => {
    var d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    return d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear();
  };

  const timeFormat = () => {
    let d = new Date();
    let minutes =
      d.getMinutes().toString().length === 1
        ? "0" + d.getMinutes()
        : d.getMinutes();
    let hours = d.getHours().toString() % 12 || 12;
    hours = hours <= 9 ? (hours = "0" + hours) : hours;
    let ampm = d.getHours() >= 12 ? "PM" : "AM";
    return hours + ":" + minutes + ampm;
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // img: (contact && contact.img) || '',
      name: (contact && contact.name) || "",
      company: (contact && contact.company) || "",
      designation: (contact && contact.designation) || "",
      email: (contact && contact.email) || "",
      phone: (contact && contact.phone) || "",
      lead_score: (contact && contact.lead_score) || "",
      tags: (contact && contact.tags) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
      company: Yup.string().required("Please Enter Company"),
      designation: Yup.string().required("Please Enter Designation"),
      email: Yup.string().required("Please Enter Email"),
      phone: Yup.string().required("Please Enter Phone"),
      lead_score: Yup.string().required("Please Enter lead_score"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateContact = {
          _id: contact ? contact._id : 0,
          // img: values.img,
          name: values.name,
          company: values.company,
          designation: values.designation,
          email: values.email,
          phone: values.phone,
          lead_score: values.lead_score,
          last_contacted: dateFormat(),
          // time: timeFormat(),
          tags: assignTag,
        };
        // update Contact
        dispatch(onUpdateContact(updateContact));
        validation.resetForm();
      } else {
        const newContact = {
          _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          // img: values["img"],
          name: values["name"],
          company: values["company"],
          designation: values["designation"],
          email: values["email"],
          phone: values["phone"],
          lead_score: values["lead_score"],
          last_contacted: dateFormat(),
          // time: timeFormat(),
          tags: assignTag,
        };
        // save new Contact
        dispatch(onAddNewContact(newContact));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Update Data
  const handleContactClick = useCallback(
    (arg) => {
      const contact = arg;

      setContact({
        contactId: contact.contactId,
        // img: contact.img,
        name: contact.name,
        company: contact.company,
        email: contact.email,
        designation: contact.designation,
        phone: contact.phone,
        lead_score: contact.lead_score,
        last_contacted: contact.date,
        // time: contact.time,
        tags: contact.tags,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );
  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime =
      moment(getTime, "hh:mm").format("hh:mm") + " " + meridiem;
    return updateTime;
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".contactCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

  const deleteMultiple = () => {
    const checkall = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element) => {
      dispatch(onDeleteContact(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".contactCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  // Column
  const columns = useMemo(
    () => [
      {
        Cell: (cellProps) => {
          return (
            <input
              type="checkbox"
              className="contactCheckBox form-check-input"
              value={cellProps.row.original._id}
              onChange={() => deleteCheckbox()}
            />
          );
        },
        id: "#",
      },
      {
        Header: "Full Name",
        accessor: "name",
        filterable: false,
        Cell: (contact) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0"></div>
              <div className="flex-grow-1 ms-2 name">
                {contact.row.original.name}
              </div>
            </div>
          </>
        ),
      },
      {
        Header: "Organization",
        accessor: "lead_score",
        filterable: false,
      },
      {
        Header: "Completion Level",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Benchmark Title",
        accessor: "Email",
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "tags",
      },
      {
        Header: "Start Date",
        Cell: (contact) => (
          <>
            {handleValidDate(contact.row.original.last_contacted)},{" "}
            <small className="text-muted"></small>
          </>
        ),
      },
      {
        Header: "End Date",
        Cell: (contact) => (
          <>
            {handleValidDate(contact.row.original.last_contacted)},{" "}
            <small className="text-muted"></small>
          </>
        ),
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          const { _id } = cellProps.row.original;
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <UncontrolledDropdown>
                  <DropdownToggle
                    href="#"
                    className="btn btn-soft-secondary btn-sm dropdown"
                    tag="button"
                  >
                    <i className="ri-more-fill align-middle"></i>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem
                      className="dropdown-item"
                      href={`/adminbenchmarking/summary/${_id}`}
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      View
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item"
                      href="/adminbenchmarking/compare"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        setInfo(contactData);
                      }}
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item remove-item-btn"
                      href="#"
                      onClick={() => {
                        const contactData = cellProps.row.original;
                        onClickDelete(contactData);
                      }}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleContactClick, checkedAll]
  );

  const [tag, setTag] = useState([]);
  const [assignTag, setAssignTag] = useState([]);

  function handlestag(tags) {
    setTag(tags);
    const assigned = tags.map((item) => item.value);
    setAssignTag(assigned);
  }

  const tags = [
    { label: "Exiting", value: "Exiting" },
    { label: "Lead", value: "Lead" },
    { label: "Long-term", value: "Long-term" },
    { label: "Partner", value: "Partner" },
  ];

  // SideBar Contact Deatail
  const [info, setInfo] = useState([]);

  const [modal_grid, setmodal_grid] = useState(false);
  function tog_grid() {
    setmodal_grid(!modal_grid);
  }
  document.title = "Profile | GreenMe";
  return (
    <React.Fragment>
      <Layouts>
        <div className="page-content overflow-auto ">
          <div className="Main-sec mx-n4 mt-n4 w-100">
            <h1>
              Benchmarking `<span className="fs-5">Admin</span>
            </h1>
            <p style={{ color: "#BEC887" }}>
              This is a page where users can take self-assessment questionnaires
              and view their results. It will feature the ability for users to
              save progress and return to the assessment later as well as an
              option to skip or go back to previous questions. Also the option
              for the user to view their score and their benchmark results
            </p>
          </div>
          <Col xxl={9} className="m-auto">
            <Col className="d-flex justify-content-between mt-0 p-5 pt-3 pb-2"></Col>
            <Row>
              <Col xxl={9}>
                <Card id="contactList">
                  <CardBody className="pt-0">
                    <div>
                      {console.log("contact", crmcontacts)}
                      {isContactSuccess && crmcontacts && crmcontacts.length ? (
                        <TableContainer
                          columns={columns}
                          data={crmcontacts || []}
                          isGlobalFilter={true}
                          isAddUserList={false}
                          isFilterA={true}
                          isFooter={true}
                          isSearchInput={false}
                          customPageSize={8}
                          className="custom-header-css"
                          divClass="table-responsive table-card mb-0"
                          tableClass="align-middle table-nowrap"
                          theadClass="table-light"
                          handleContactClick={handleContactClicks}
                          isContactsFilter={false}
                          SearchPlaceholder={false}
                        />
                      ) : (
                        <Loader error={error} />
                      )}
                    </div>

                    <Modal
                      id="showModal"
                      isOpen={modal}
                      toggle={toggle}
                      centered
                    >
                      <ModalHeader className="bg-soft-info p-3" toggle={toggle}>
                        {!!isEdit ? "Edit Contact" : "Add Contact"}
                      </ModalHeader>

                      <Form
                        className="tablelist-form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <ModalBody>
                          <Input type="hidden" id="id-field" />
                          <Row className="g-3">
                            <Col lg={12}>
                              <div className="text-center">
                                <div className="position-relative d-inline-block">
                                  <div className="position-absolute  bottom-0 end-0">
                                    <Label
                                      htmlFor="customer-image-input"
                                      className="mb-0"
                                    >
                                      <div className="avatar-xs cursor-pointer">
                                        <div className="avatar-title bg-light border rounded-circle text-muted">
                                          <i className="ri-image-fill"></i>
                                        </div>
                                      </div>
                                    </Label>
                                    <Input
                                      className="form-control d-none"
                                      id="customer-image-input"
                                      type="file"
                                      accept="image/png, image/gif, image/jpeg"
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.img || ""}
                                      invalid={
                                        validation.touched.img &&
                                        validation.errors.img
                                          ? true
                                          : false
                                      }
                                    />
                                  </div>
                                  <div className="avatar-lg p-1">
                                    <div className="avatar-title bg-light rounded-circle">
                                      <img
                                        src={dummyImg}
                                        alt="dummyImg"
                                        id="customer-img"
                                        className="avatar-md rounded-circle object-cover"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label
                                  htmlFor="name-field"
                                  className="form-label"
                                >
                                  Name
                                </Label>
                                <Input
                                  name="name"
                                  id="customername-field"
                                  className="form-control"
                                  placeholder="Enter Name"
                                  type="text"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.name || ""}
                                  invalid={
                                    validation.touched.name &&
                                    validation.errors.name
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.name &&
                                validation.errors.name ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.name}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div>
                                <Label
                                  htmlFor="company_name-field"
                                  className="form-label"
                                >
                                  Company Name
                                </Label>
                                <Input
                                  name="company"
                                  id="company_name-field"
                                  className="form-control"
                                  placeholder="Enter Company Name"
                                  type="text"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.company || ""}
                                  invalid={
                                    validation.touched.company &&
                                    validation.errors.company
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.company &&
                                validation.errors.company ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.company}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>

                            <Col lg={12}>
                              <div>
                                <Label
                                  htmlFor="designation-field"
                                  className="form-label"
                                >
                                  Designation
                                </Label>

                                <Input
                                  name="designation"
                                  id="designation-field"
                                  className="form-control"
                                  placeholder="Enter Designation"
                                  type="text"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.designation || ""}
                                  invalid={
                                    validation.touched.designation &&
                                    validation.errors.designation
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.designation &&
                                validation.errors.designation ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.designation}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>

                            <Col lg={12}>
                              <div>
                                <Label
                                  htmlFor="email_id-field"
                                  className="form-label"
                                >
                                  Emai
                                </Label>

                                <Input
                                  name="email"
                                  id="email_id-field"
                                  className="form-control"
                                  placeholder="Enter Email"
                                  type="text"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.email || ""}
                                  invalid={
                                    validation.touched.email &&
                                    validation.errors.email
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.email &&
                                validation.errors.email ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.email}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div>
                                <Label
                                  htmlFor="phone-field"
                                  className="form-label"
                                >
                                  Phone
                                </Label>

                                <Input
                                  name="phone"
                                  id="phone-field"
                                  className="form-control"
                                  placeholder="Enter Phone No."
                                  type="text"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.phone || ""}
                                  invalid={
                                    validation.touched.phone &&
                                    validation.errors.phone
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.phone &&
                                validation.errors.phone ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.phone}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div>
                                <Label
                                  htmlFor="lead_score-field"
                                  className="form-label"
                                >
                                  Lead Score
                                </Label>

                                <Input
                                  name="lead_score"
                                  id="lead_score-field"
                                  className="form-control"
                                  placeholder="Enter Lead Score"
                                  type="text"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.lead_score || ""}
                                  invalid={
                                    validation.touched.lead_score &&
                                    validation.errors.lead_score
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.lead_score &&
                                validation.errors.lead_score ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.lead_score}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div>
                                <Label
                                  htmlFor="taginput-choices"
                                  className="form-label font-size-13 text-muted"
                                >
                                  Tags
                                </Label>
                                <Select
                                  isMulti
                                  value={tag}
                                  onChange={(e) => {
                                    handlestag(e);
                                  }}
                                  className="mb-0"
                                  options={tags}
                                  id="taginput-choices"
                                ></Select>

                                {validation.touched.tags &&
                                validation.errors.tags ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.tags}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          <div className="hstack gap-2 justify-content-end">
                            <button
                              type="button"
                              className="btn btn-light"
                              onClick={() => {
                                setModal(false);
                              }}
                            >
                              {" "}
                              Close{" "}
                            </button>
                            <button
                              type="submit"
                              className="btn btn-success"
                              id="add-btn"
                            >
                              {" "}
                              {!!isEdit ? "Update" : "Add Contact"}{" "}
                            </button>
                          </div>
                        </ModalFooter>
                      </Form>
                    </Modal>
                    <ToastContainer closeButton={false} limit={1} />
                  </CardBody>
                </Card>
              </Col>

              <Col xxl={3}>
                <Card id="contact-view-detail">
                  <CardBody className="text-center">
                    <div className="position-relative d-inline-block">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-lg rounded-circle img-thumbnail"
                      />
                      <span className="contact-active position-absolute rounded-circle bg-success">
                        <span className="visually-hidden"></span>
                      </span>
                    </div>
                    <h5 className="mt-4 mb-1">{info.name || "Tonya Noble"}</h5>
                    <p className="text-muted">
                      {info.company || "FleetMGT Co. Z"}
                    </p>
                  </CardBody>
                  <CardBody>
                    <div className="progress animated-progress custom-progress progress-label mt-4">
                      <div
                        className="progress-bar bg- "
                        role="progressbar"
                        style={{ width: "50%" }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div className="label">50%</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-4 mt-3">
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-">Benchmark Completion</h5>
                      </div>
                    </div>
                  </CardBody>
                  <CardBody className="d-flex gap-2 ">
                    <span className="mt-2">Chat</span>
                    <span className="avatar-xs">
                      <Link
                        to="#"
                        className="avatar-title bg-soft-warning text-warning fs-15 rounded"
                      >
                        <i className="ri-question-answer-line"></i>
                      </Link>
                    </span>
                  </CardBody>
                  <CardBody>
                    <div className="table-responsive table-card">
                      <Table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <td className="fw-medium">Orgnaisation</td>
                            <td>FleetMGT Co. A</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Benchmark title</td>
                            <td>Country Fleet Manager</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Country</td>
                            <td>Kenya</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Leaderboard</td>
                            <td>{info.lead_score || "154 points"}</td>
                          </tr>
                          <tr>
                            <td className="fw-medium">Last Seen</td>
                            <td>
                              15 Dec, 2021<span> 08:58AM</span>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </div>
      </Layouts>
    </React.Fragment>
  );
};

export default BenchmarkAdmin;
