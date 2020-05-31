import React, { useState, useEffect } from "react";
import API from "../../utils/API";

export default () => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await API("reports/", "get");
      if (res.status === 200) {
        setVisits(res.data.visits);
      }
    })();
  }, []);

  return (
    <table class="min-w-full leading-normal mt-3">
      <thead>
        <tr>
          <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Month, Year
          </th>
          <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            visits
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(visits).map((month) => (
          <tr key={month}>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {month}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {visits[month]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
