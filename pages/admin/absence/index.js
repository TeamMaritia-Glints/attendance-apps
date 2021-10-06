import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../../components/layout";

const Absence = () => {
  const [Absence] = useState([]);

  return (
    <>
      <Layout>
        <div className="px-12">
          <h1>Workers with more than 2 absence in a month</h1>
          <div className="overflow-auto border">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th className="font-normal px-6 py-2">No</th>
                  <th className="font-normal px-6 py-2">Name</th>
                  <th className="font-normal px-6 py-2">Role</th>
                  <th className="font-normal px-6 py-2">Absence</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="font-normal px-6 py-2"></td>
                  <td className="font-normal px-6 py-2"></td>
                  <td className="font-normal px-6 py-2"></td>
                  <td className="font-normal px-6 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Absence;
