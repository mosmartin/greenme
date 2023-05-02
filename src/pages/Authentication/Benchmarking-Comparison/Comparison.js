import React from "react";
import Layouts from "../../../Layouts";
import Germany from "../../../assets/images/Banchmarking/Germany-flag.png";

const Comparison = () => {
  return (
    <React.Fragment>
      <Layouts>
        <div className="page-content overflow-auto ">
          <div className="Main  mx-n4 mt-n4 w-100 Comparison">
            <h1>Benchmarking Comparison</h1>
            <p>
              This is a page where users can take self-assessment questionnaires
              and view their results. It will feature the ability for users to
              save progress and return to the assessment later as well as an
              option to skip or go back to previous questions. Also the option
              for the user to view their score and their benchmark results.
            </p>
          </div>
          <div className="table-responsive table-card mt-5 ">
            <table className="table align-middle table-nowrap table-striped-columns mb-0">
              <tbody className="d-flex justify-content-between align-items-center">
                <thead>
                  <th className="p-0">
                    <div className="trr">
                      <tr>Benchmark Title</tr>
                    </div>
                    <div className="trr">
                      <tr scope="col">Country</tr>
                    </div>
                    <div className="trr">
                      <tr scope="col">Num of Yes</tr>
                    </div>
                    <div className="trr">
                      <tr scope="col">Num of No</tr>
                    </div>
                    <div className="trr">
                      <tr scope="col">Num of I don’t know</tr>
                    </div>
                    <div className="trr">
                      <tr scope="col">Status</tr>
                    </div>
                    <div className="trr">
                      <tr scope="col">Duration</tr>
                    </div>
                    <div className="trr">
                      <tr scope="col">Level of completion %</tr>
                    </div>
                  </th>
                </thead>
                <th>
                  <div className="tr">
                    <tr>Benchmark Title 2</tr>
                  </div>
                  <div className="tr">
                    <tr>
                      {" "}
                      <div className="d-flex gap-2 align-items-center">
                        <span>
                          <img src={Germany} />
                        </span>{" "}
                        <span>Germany</span>
                      </div>
                    </tr>
                  </div>
                  <div className="tr">
                    <tr>15</tr>
                  </div>
                  <div className="tr">
                    <tr>$24.05</tr>
                  </div>
                  <div className="tr">
                    <tr>sddf</tr>
                  </div>
                  <div className="tr">
                    <tr>fghfgh</tr>
                  </div>
                  <div className="tr">
                    <tr>fghfgh</tr>
                  </div>
                  <div className="tr">
                    <tr>fghfgh</tr>
                  </div>
                </th>
                <th>
                  <div className="tr">
                    <tr>Benchmark Title 2</tr>
                  </div>
                  <div className="tr">
                    <tr>
                      {" "}
                      <div className="d-flex gap-2 align-items-center">
                        <span>
                          <img src={Germany} />
                        </span>{" "}
                        <span>Germany</span>
                      </div>
                    </tr>
                  </div>
                  <div className="tr">
                    <tr>15</tr>
                  </div>
                  <div className="tr">
                    <tr>$24.05</tr>
                  </div>
                  <div className="tr">
                    <tr>sddf</tr>
                  </div>
                  <div className="tr">
                    <tr>fghfgh</tr>
                  </div>
                  <div className="tr">
                    <tr>fghfgh</tr>
                  </div>
                  <div className="tr">
                    <tr>fghfgh</tr>
                  </div>
                </th>
                <th>
                  <div className="tr">
                    <tr>Benchmark Title 3</tr>
                  </div>
                  <div className="tr">
                    <tr>
                      {" "}
                      <div className="d-flex gap-2 align-items-center">
                        <span>
                          <img src={Germany} />
                        </span>{" "}
                        <span>Germany</span>
                      </div>
                    </tr>
                  </div>
                  <div className="tr">
                    <tr>11</tr>
                  </div>
                  <div className="tr">
                    <tr>$24.05</tr>
                  </div>
                  <div className="tr">
                    <tr>sddf</tr>
                  </div>
                  <div className="tr">
                    <tr>fghfgh</tr>
                  </div>
                  <div className="tr">
                    <tr>fghfgh</tr>
                  </div>
                  <div className="tr">
                    <tr>fghfgh</tr>
                  </div>
                </th>
              </tbody>
            </table>
          </div>
        </div>
      </Layouts>
    </React.Fragment>
  );
};

export default Comparison;
