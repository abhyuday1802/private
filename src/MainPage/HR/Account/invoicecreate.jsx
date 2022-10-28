import React, { useEffect, useState, useReducer } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { UploadOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Upload,
  Input,
  Dropdown,
  Menu,
  message,
  Select,
  Space,
  Tooltip,
} from "antd";
import InvoiceTemplate from "./InvoiceTemplate";

const initialState = {
  Item: "",
  Amount: 0,
  GST: 0,
  Quantity: 0,
  Rate: 0,
};

const datalist = [];

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};

const { Option } = Select;

const props = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      // console.log(file, fileList);
    }
  },

  defaultFileList: [],
};

const row = [initialState];
const reducer = (state, action) => {
  switch (action.type) {
    case "ITEM":
      return (state = {
        ...state,
        Item: action.payload,
      });

    case "GST":
      const cgst = state.GST / 2;
      const amount = state.Quantity * state.Rate;
      const f_Gst = amount * state.GST;
      const final_Gst = f_Gst / 100;
      const amounta = amount + final_Gst;
      return (state = {
        ...state,
        GST: action.payload,
      });

    case "QUANTITY":
      return (state = { ...state, Quantity: action.payload });

    case "RATE":
      return (state = { ...state, Rate: action.payload });

    case "ADDROW":
      return datalist.push({ id: Date.now() + Math.random(), ...state });

    case "REMOVE":
      return datalist.filter((item) => item.id !== action.payload);

    default:
      break;
  }
};

console.log("datalist", datalist);
const Invoicecreate = () => {
  // const [Amount, setAmount] = useState(0);
  // const [GST, setGST] = useState(0);
  // const [Quantity, setQuantity] = useState(0);
  // const [Rate, setRate] = useState(0);
  // const addRow = [1];

  // console.log("row", addRow);

  // setAmount(amounta);

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state", state);
  const [total, settotal] = useState([]);
  const [cgst1, setcgst1] = useState([]);
  const [formvalue, setFormValues] = useState([
    {
      item: "",
      gst: "",
      quentity: "",
      rate: "",
      cgst: "",
      sgcst: "",
      amount: "",
    },
  ]);

  const [clientInfo, setClientInfo] = useState({
    invoiceNo: "",
    client: "",
    project: "",
    email: "",
    clientAddress: "",
    billingAddress: "",
    invoiceDate: "",
    dueDate: "",
    signature: "",
  });

  console.log("client_info", clientInfo);

  const props = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        setClientInfo({ ...clientInfo, signature: fileList });
      }
    },

    defaultFileList: [],
  };

  // const cgst = formvalue[0].gst / 2;
  // formvalue[0].cgst = cgst;
  const cgst = 0;

  const amount = state.Quantity * state.Rate;
  const f_Gst = amount * state.GST;
  const final_Gst = f_Gst / 100;
  const amounta = amount + final_Gst;

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });
  // setFormValues((item) => [
  //   ...item,
  //   {
  //     cgst: cgst,
  //     sgcst: "",
  //     amount: "",
  //   },
  // ]);

  console.log(formvalue.GST, "------------");
  const addFormFields = () => {
    setFormValues((item) => [
      ...item,
      {
        item: "",
        gst: "",
        quentity: "",
        rate: "",
        cgst: "",
        sgcst: "",
        amount: "",
      },
    ]);
  };

  const handleChange = (index, e) => {
    const newiteamadd = [...formvalue];

    newiteamadd[index][e.target.name] = e.target.value;
    const cgst = newiteamadd[index].gst / 2;

    newiteamadd[index].sgcst = cgst;
    newiteamadd[index].cgst = cgst;
    console.log(cgst, "----------");
    const amount = newiteamadd[index].quentity * newiteamadd[index].rate;
    const f_Gst = amount * newiteamadd[index].gst;
    const final_Gst = f_Gst / 100;
    const amounta = amount + final_Gst;
    newiteamadd[index].amount = amounta;
    const final = 12;

    settotal(newiteamadd[index].amount + final);
    // total = newiteamadd[index].amount + total;
    // final = newiteamadd[index].amount;
    setcgst1(final_Gst);
    // console.log(final, "totalAmount");

    setFormValues(newiteamadd);
  };

  const removeFormFields = (i) => {
    console.log(i, "---------");
    const newiteamadd = [...formvalue];
    // newiteamadd[index][e.target.name] =  e.target.value
    const filterdata = newiteamadd.filter((ele, index) => index !== i);
    setFormValues(filterdata);
  };

  const totalAmount = total;
  const final_Gst1 = cgst1;
  console.log("console.log(datalist);", formvalue);

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Create Invoice</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Create Invoice</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/app/main/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Create Invoice</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-12">
            <form>
              <div className="row">
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>
                      Invoice No <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={clientInfo.invoiceNo}
                      onChange={(e) => {
                        setClientInfo({
                          ...clientInfo,
                          invoiceNo: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>
                      Client <span className="text-danger">*</span>
                    </label>
                    <select
                      className="select"
                      value={clientInfo.client}
                      onChange={(e) => {
                        setClientInfo({
                          ...clientInfo,
                          client: e.target.value,
                        });
                      }}
                    >
                      <option>Please Select</option>
                      <option>Barry Cuda</option>
                      <option>Tressa Wexler</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>
                      Project <span className="text-danger">*</span>
                    </label>
                    <select
                      className="select"
                      value={clientInfo.project}
                      onChange={(e) => {
                        setClientInfo({
                          ...clientInfo,
                          project: e.target.value,
                        });
                      }}
                    >
                      <option>Select Project</option>
                      <option>Office Management</option>
                      <option>Project Management</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="email"
                      value={clientInfo.email}
                      onChange={(e) => {
                        setClientInfo({
                          ...clientInfo,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                {/* <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>Tax</label>
                    <select className="select">
                      <option>Select Tax</option>
                      <option>VAT</option>
                      <option>GST</option>
                      <option>No Tax</option>
                    </select>
                  </div>
                </div> */}
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>Client Address</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={clientInfo.clientAddress}
                      onChange={(e) => {
                        setClientInfo({
                          ...clientInfo,
                          clientAddress: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>Billing Address</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={clientInfo.billingAddress}
                      onChange={(e) => {
                        setClientInfo({
                          ...clientInfo,
                          billingAddress: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>
                      Invoice date <span className="text-danger">*</span>
                    </label>
                    <div>
                      <input
                        className="form-control datetimepicker"
                        type="date"
                        value={clientInfo.invoiceDate}
                        onChange={(e) => {
                          setClientInfo({
                            ...clientInfo,
                            invoiceDate: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>
                      Due Date <span className="text-danger">*</span>
                    </label>
                    <div>
                      <input
                        className="form-control datetimepicker"
                        type="date"
                        value={clientInfo.dueDate}
                        onChange={(e) => {
                          setClientInfo({
                            ...clientInfo,
                            dueDate: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="form-group">
                    <label>
                      Signature <span className="text-danger">*</span>
                    </label>
                    <div>
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </div>
                  </div>
                </div>
                <ul className="col-12 py-3">
                  <li className="row justify-content-around align-items-center">
                    <li className="col-md-4 bg-white my-2 p-4">
                      <h2 className="d-flex gap-2">
                        Billed By{" "}
                        <span className="align-self-end">(Your Details)</span>
                      </h2>
                      <section className="row my-2">
                        <Select
                          showSearch
                          placeholder="Select a User"
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          <Option value="Ritik">Ritik</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="tom">Tom</Option>
                        </Select>
                      </section>

                      <h4 className="name">Business details</h4>
                      <section className="d-flex gap-2">
                        <p>Business Name</p>-<p>Ritik Corporatie</p>
                      </section>
                      <section className="d-flex gap-2">
                        <p>Address </p> -<p>India</p>
                      </section>
                    </li>

                    <li className="col-md-4 bg-white my-2 p-4">
                      <h2 className="d-flex gap-2">
                        Billed To{" "}
                        <span className="align-self-end">(Client Details)</span>
                      </h2>
                      <section className="row gap-1 align-items-center justify-content-start">
                        <Select
                          className="col-md-6"
                          showSearch
                          placeholder="Select a User"
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          <Option value="Ritik">Ritik</Option>
                        </Select>
                        <button
                          type="button"
                          className="btn col-sm-auto btn-primary"
                        >
                          Add New Client
                        </button>
                      </section>
                      <h4 className="name">Business details</h4>
                      <section className="d-flex gap-2">
                        <p>Business Name</p>-<p>Ritik Corporatie</p>
                      </section>
                      <section className="d-flex gap-2">
                        <p>Address </p> -<p>India</p>
                      </section>
                    </li>
                  </li>
                </ul>
                <ul className="col-md-6"></ul>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="table-responsive">
                    <table className="table table-hover table-white">
                      <thead>
                        <tr>
                          <th style={{ width: "20px" }}>#</th>
                          <th className="col-sm-2">Items</th>
                          <th className="col-sm-2">GST Rate</th>
                          <th className="col-sm-2">Quantity</th>
                          <th className="col-sm-2">Rate</th>
                          <th className="col-sm-2">CGST</th>
                          <th className="col-sm-2">SGST</th>
                          <th style={{ width: "100px" }}>Amount</th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formvalue.map((ele, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  <input
                                    className="form-control"
                                    type="text"
                                    style={{ minWidth: "150px" }}
                                    name="item"
                                    value={formvalue.item}
                                    // onChange={(e) =>
                                    //   dispatch({
                                    //     type: "ITEM",
                                    //     payload: e.target.value,
                                    //   })
                                    // }
                                    onChange={(e) => {
                                      handleChange(index, e);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    style={{ width: "80px" }}
                                    type="text"
                                    value={formvalue.gst}
                                    name="gst"
                                    onInput={(e) =>
                                      setFormValues({
                                        ...formvalue,
                                        gst: e.target.value,
                                      })
                                    }
                                    onChange={(e) => {
                                      handleChange(index, e);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    style={{ width: "80px" }}
                                    type="text"
                                    value={formvalue.quentity}
                                    name="quentity"
                                    onInput={(e) =>
                                      setFormValues({
                                        ...formvalue,
                                        quentity: e.target.value,
                                      })
                                    }
                                    // onChange={(e) =>
                                    //   dispatch({
                                    //     type: "QUANTITY",
                                    //     payload: e.target.value,
                                    //   })
                                    // }
                                    onChange={(e) => {
                                      handleChange(index, e);
                                    }}
                                  />
                                </td>

                                <td>
                                  <input
                                    className="form-control"
                                    style={{ width: "80px" }}
                                    type="text"
                                    name="rate"
                                    // value={state.Rate}
                                    value={formvalue.rate}
                                    // onChange={(e) =>
                                    //   dispatch({
                                    //     type: "RATE",
                                    //     payload: e.target.value,
                                    //   })
                                    // }
                                    onChange={(e) => {
                                      handleChange(index, e);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    style={{ width: "80px" }}
                                    type="text"
                                    name="cgst"
                                    readOnly
                                    value={formvalue[index].cgst}
                                    // value={cgst ? cgst : 0}
                                    onChange={(e) => {
                                      handleChange(index, e);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    style={{ width: "80px" }}
                                    type="text"
                                    name="sgcst"
                                    value={formvalue[index].sgcst}
                                    readOnly
                                    // value={cgst ? cgst : 0}
                                    onChange={(e) => {
                                      handleChange(index, e);
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    readOnly
                                    name="amount"
                                    style={{ width: "120px" }}
                                    type="text"
                                    value={formvalue[index].amount}
                                    onChange={(e) => {
                                      handleChange(index, e);
                                    }}
                                  />
                                </td>
                                <td>
                                  {formvalue.length > 1 ? (
                                    <button
                                      className="btn btn-danger"
                                      type="button"
                                      onClick={() => {
                                        removeFormFields(index);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  ) : null}
                                </td>
                                <td>
                                  {index === formvalue.length - 1 ? (
                                    <button
                                      className="btn btn-success"
                                      type="button"
                                      onClick={addFormFields}
                                    >
                                      Add
                                    </button>
                                  ) : null}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover table-white">
                      <tbody>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td className="text-end">Amount</td>
                          <td
                            style={{
                              textAlign: "right",
                              paddingRight: "30px",
                              width: "230px",
                            }}
                          >
                            {totalAmount}
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td className="text-end">SGST</td>
                          <td
                            style={{
                              textAlign: "right",
                              paddingRight: "30px",
                              width: "230px",
                            }}
                          >
                            {final_Gst1}
                          </td>
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td />
                          <td />
                          <td className="text-end">SGST</td>
                          <td
                            style={{
                              textAlign: "right",
                              paddingRight: "30px",
                              width: "230px",
                            }}
                          >
                            {final_Gst1}
                          </td>
                        </tr>

                        <tr>
                          <td
                            colSpan={5}
                            style={{ textAlign: "right", fontWeight: "bold" }}
                          >
                            Grand Total
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              paddingRight: "30px",
                              fontWeight: "bold",
                              fontSize: "16px",
                              width: "230px",
                            }}
                          >
                            ₹ {totalAmount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Other Information</label>
                        <textarea className="form-control" defaultValue={""} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /Page Content */}\
      <InvoiceTemplate />
    </div>
  );
};
export default Invoicecreate;
