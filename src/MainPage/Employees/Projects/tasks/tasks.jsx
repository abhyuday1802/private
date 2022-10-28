import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import "../../../index.css";
import {
  Avatar_16,
  Avatar_02,
  Avatar_05,
  Avatar_09,
  Avatar_10,
  Attachment,
  User,
  Avatar_08,
  Avatar_26,
} from "../../../../Entryfile/imagepath";

const Tasks = () => {
  const [task, settask] = useState(true);
  const [addtask, setaddtask] = useState(true);
  const [taskText, setTaskText] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [mark, setMark] = useState([]);

  const ontaskClick = () => {
    settask(!task);
  };

  console.log("taskList", taskList);

  const [text, setText] = useState("");

  const [fields, setFields] = useState([]);

  function onChangeTask(event) {
    setText(event.target.value);
  }

  function handleAdd() {
    setTaskText(!taskText);
    setToastMessage("Task has been Added");
    const values = [...fields];
    if (text != "") {
      values.push({ value: text });
      console.log("notifivaton", values);
      setFields(values);
    }
    setTimeout(() => {
      setTaskText(true);
    }, 3000);
  }

  function handleRemove(i, value) {
    setTaskText(false);

    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
    setTimeout(() => {
      setTaskText(true);
    }, 3000);
  }
  const onImageUpload = (fileList) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      ReactSummernote.insertImage(reader.result);
    };
    reader.readAsDataURL(fileList[0]);
  };

  useEffect(() => {
    if ($(".select").length > 0) {
      $(".select").select2({
        minimumResultsForSearch: -1,
        width: "100%",
      });
    }
  });

  const handleMark = (i, value) => {
    setFields([...value, value]);
  };

  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Tasks - HRMS Admin Template</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <div className="chat-main-row">
        <div className="chat-main-wrapper">
          <div className="col-lg-7 message-view task-view task-left-sidebar">
            <div className="chat-window">
              <div className="fixed-header">
                <div className="navbar">
                  <div className="float-start me-auto">
                    <div className="add-task-btn-wrapper">
                      <span
                        onClick={ontaskClick}
                        className={`" ${
                          task
                            ? "add-task-btn btn btn-white btn-sm"
                            : "add-task-btn btn btn-white btn-sm visible"
                        }`}
                      >
                        Add Task
                      </span>
                    </div>
                  </div>
                  <a
                    className="task-chat profile-rightbar float-end"
                    id="task_chat"
                    href="#task_window"
                  >
                    <i className="fa fa fa-comment" />
                  </a>
                  <ul className="nav float-end custom-menu">
                    <li className="nav-item dropdown dropdown-action">
                      <a
                        href=""
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-cog" />
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="">
                          Pending Tasks
                        </a>
                        <a className="dropdown-item" href="">
                          Completed Tasks
                        </a>
                        <a className="dropdown-item" href="">
                          All Tasks
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="chat-contents">
                <div className="chat-content-wrap">
                  <div className="chat-wrap-inner">
                    <div className="chat-box">
                      <div className="task-wrapper">
                        <div className="task-list-container">
                          <div className="task-list-body">
                            <ul id="task-list">
                              {fields.map((field, idx) => {
                                return (
                                  <li className="task" key={`${field}-${idx}`}>
                                    <div className="task-container">
                                      <span className="task-action-btn task-check">
                                        <span
                                          className="action-circle large complete-btn"
                                          title="Mark Complete"
                                          onClick={() => handleMark(idx, field)}
                                        >
                                          <i className="material-icons">
                                            check
                                          </i>
                                        </span>
                                      </span>
                                      <span
                                        className="task-label"
                                        contentEditable="true"
                                        suppressContentEditableWarning={true}
                                      >
                                        {field?.value}
                                      </span>
                                      <span className="task-action-btn task-btn-right">
                                        <span
                                          className="action-circle large delete-btn"
                                          title="Delete Task"
                                        >
                                          <i
                                            className="material-icons"
                                            onClick={() =>
                                              handleRemove(idx, field.value)
                                            }
                                          >
                                            delete
                                          </i>
                                        </span>
                                      </span>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>

                          <div className="task-list-footer">
                            <div
                              className={` ${
                                task
                                  ? "new-task-wrapper"
                                  : "new-task-wrapper visible"
                              }`}
                            >
                              <textarea
                                id="new-task"
                                placeholder="Enter new task here. . ."
                                defaultValue={""}
                                onChange={(e) => onChangeTask(e)}
                              />
                              <span className="error-message hidden">
                                You need to enter a task first
                              </span>
                              <span
                                onClick={() => handleAdd()}
                                className="add-new-task-btn btn"
                                id="add-task"
                              >
                                Add Task
                              </span>
                              <span
                                id="close-task-panel"
                                onClick={ontaskClick}
                                className={` btn"${
                                  task
                                    ? "add-task-btn btn btn-white btn-sm"
                                    : "add-task-btn btn btn-white btn-sm visible"
                                }`}
                              >
                                Close
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Create Project Modal */}
      <div
        id="create_project"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Project</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Project Name</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Client</label>
                      <select className="select">
                        <option>Global Technologies</option>
                        <option>Delta Infotech</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Start Date</label>
                      <div>
                        <input
                          className="form-control datetimepicker"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>End Date</label>
                      <div>
                        <input
                          className="form-control datetimepicker"
                          type="date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Rate</label>
                      <input
                        placeholder="$50"
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>&nbsp;</label>
                      <select className="select">
                        <option>Hourly</option>
                        <option>Fixed</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Priority</label>
                      <select className="select">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Add Project Leader</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Team Leader</label>
                      <div className="project-members">
                        <a
                          className="avatar"
                          href="#"
                          data-bs-toggle="tooltip"
                          title="Jeffery Lalor"
                        >
                          <img alt="" src={Avatar_16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Add Team</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Team Members</label>
                      <div className="project-members">
                        <a
                          className="avatar"
                          href="#"
                          data-bs-toggle="tooltip"
                          title="John Doe"
                        >
                          <img alt="" src={Avatar_02} />
                        </a>
                        <a
                          className="avatar"
                          href="#"
                          data-bs-toggle="tooltip"
                          title="Richard Miles"
                        >
                          <img alt="" src={Avatar_09} />
                        </a>
                        <a
                          className="avatar"
                          href="#"
                          data-bs-toggle="tooltip"
                          title="John Smith"
                        >
                          <img alt="" src={Avatar_10} />
                        </a>
                        <a
                          className="avatar"
                          href="#"
                          data-bs-toggle="tooltip"
                          title="Mike Litorus"
                        >
                          <img alt="" src={Avatar_05} />
                        </a>
                        <span className="all-team">+2</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <ReactSummernote
                    value="Default value"
                    options={{
                      lang: "ru-RU",
                      height: 350,
                      dialogsInBody: true,
                      toolbar: [
                        ["style", ["style"]],
                        ["font", ["bold", "underline", "clear"]],
                        ["fontname", ["fontname"]],
                        ["para", ["ul", "ol", "paragraph"]],
                        ["table", ["table"]],
                        ["insert", ["link", "picture", "video"]],
                        ["view", ["fullscreen", "codeview"]],
                      ],
                    }}
                    // onChange={this.onChange}
                    onImageUpload={onImageUpload}
                  />
                </div>
                <div className="form-group">
                  <label>Upload Files</label>
                  <input className="form-control" type="file" />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Create Project Modal */}
      {/* Assignee Modal */}
      <div id="assignee" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Assign to this task</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group m-b-30">
                <input
                  placeholder="Search to add"
                  className="form-control search-input"
                  type="text"
                />
                <span className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </span>
              </div>
              <div>
                <ul className="chat-user-list">
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_09} />
                        </span>
                        <div className="media-body align-self-center text-nowrap">
                          <div className="user-name">Richard Miles</div>
                          <span className="designation">Web Developer</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_10} />
                        </span>
                        <div className="media-body align-self-center text-nowrap">
                          <div className="user-name">John Smith</div>
                          <span className="designation">Android Developer</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_16} />
                        </span>
                        <div className="media-body align-self-center text-nowrap">
                          <div className="user-name">Jeffery Lalor</div>
                          <span className="designation">Team Leader</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="submit-section">
                <button className="btn btn-primary submit-btn">Assign</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Assignee Modal */}
      {/* Task Followers Modal */}
      <div
        id="task_followers"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add followers to this task</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group m-b-30">
                <input
                  placeholder="Search to add"
                  className="form-control search-input"
                  type="text"
                />
                <span className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </span>
              </div>
              <div>
                <ul className="chat-user-list">
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_16} />
                        </span>
                        <div className="media-body media-middle text-nowrap">
                          <div className="user-name">Jeffery Lalor</div>
                          <span className="designation">Team Leader</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_08} />
                        </span>
                        <div className="media-body media-middle text-nowrap">
                          <div className="user-name">Catherine Manseau</div>
                          <span className="designation">Android Developer</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_26} />
                        </span>
                        <div className="media-body media-middle text-nowrap">
                          <div className="user-name">Wilmer Deluna</div>
                          <span className="designation">Team Leader</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="submit-section">
                <button className="btn btn-primary submit-btn">
                  Add to Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Task Followers Modal */}
    </div>
  );
};

export default Tasks;
