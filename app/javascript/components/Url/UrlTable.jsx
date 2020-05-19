import React, { useEffect, useState } from "react";
import axios from "axios";

import sortUrl from "./../../utils/sortUrl";

import UrlCard from "./UrlCard";

export default () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/v1/urls");
      if (res.status === 200) {
        setUrls(res.data.urls);
      }
    })();
  }, []);

  const updateUrls = (id) => {
    setUrls(
      urls.map((url, index) =>
        index === id
          ? {
              ...url,
              updated_at: new Date(Date.now()).toISOString(),
              pinned: !url.pinned,
            }
          : url
      )
    );
  };

  return (
    <table className="table-auto w-full">
      <thead className="text-teal-700">
        <tr>
          <th className="px-4 py-2">Original</th>
          <th className="px-4 py-2">Short</th>
          <th className="px-4 py-2">Pin</th>
        </tr>
      </thead>
      <tbody>
        {urls.sort(sortUrl).map((url, id) => (
          <UrlCard updateUrls={updateUrls} url={url} id={id} key={url.id} />
        ))}
      </tbody>
    </table>
  );
};
