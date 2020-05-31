import React, { useEffect, useState } from "react";
import API from "../../utils/API";

import sortUrl from "./../../utils/sortUrl";

import UrlCard from "./UrlCard";

export default () => {
  const [urls, setUrls] = useState([]);
  const [visits, setVisits] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await API("/urls", "get");
      if (res.status === 200) {
        setUrls(res.data.urls);
        setCategories(res.data.categories);
        setVisits(res.data.visits);
      }
    })();
  }, []);

  return (
    <table className="container table-auto w-full">
      <thead className="text-teal-700">
        <tr>
          <th className="px-4 py-2">Original</th>
          <th className="px-4 py-2">Short</th>
          <th className="px-4 py-2">Category</th>
          <th className="px-4 py-2">Count</th>
          <th className="px-4 py-2">Pin</th>
        </tr>
      </thead>
      <tbody>
        {urls.sort(sortUrl).map((url) => (
          <UrlCard
            key={url.id}
            url={url}
            urls={urls}
            setUrls={setUrls}
            categories={categories}
            visit={visits[url.id]}
          />
        ))}
      </tbody>
    </table>
  );
};
