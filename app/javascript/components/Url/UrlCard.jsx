import React, { useState, useRef } from "react";
import axios from "axios";

export default ({ url: { original, short, pinned }, updateUrls, id }) => {
  // const [pin, setPin] = useState(pinned);
  const pinRef = useRef();
  pinRef.current = pinned;

  const updatePin = async () => {
    await updateUrls(id);
    const res = await axios.put(
      `/api/v1/urls/${short}`,
      { url: { pinned: pinRef.current } },
      {
        headers: {
          "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status !== 200) {
      updateUrls(id);
    }
  };

  return (
    <tr className="text-center text-gray-700">
      <td className="border px-4 py-2">
        <a href={original} target="_blank" className="hover:text-yellow-600">
          {original}
        </a>
      </td>
      <td className="border px-4 py-2">
        <a
          href={`https://${window.location.hostname}/${short}`}
          target="_blank"
          className="hover:text-yellow-600"
        >{`https://${window.location.hostname}/${short}`}</a>
      </td>
      <td className="border px-4 py-2" onClick={updatePin}>
        {pinned ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Capa_1"
            className="mx-auto fill-current text-teal-700 hover:text-yellow-600"
            enableBackground="new 0 0 512 512"
            height="20"
            viewBox="0 0 512 512"
            width="20"
          >
            <g>
              <path d="m188.852 183.848c-35.147-35.147-92.132-35.147-127.279 0l266.579 266.579c35.147-35.147 35.147-92.132 0-127.279 0 0-139.3-139.3-139.3-139.3z" />
              <path d="m319.667 95.46-105.496 71.28 131.088 131.089 71.281-105.496z" />
              <path d="m351.487 0c-23.431 23.431-23.431 61.421 0 84.853l75.66 75.66c23.431 23.431 61.421 23.431 84.853 0z" />
              <path
                d="m-23.161 404.872h230.578v30h-230.578z"
                transform="matrix(.707 -.707 .707 .707 -269.911 188.122)"
              />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Capa_1"
            className="mx-auto fill-current text-teal-700 hover:text-yellow-600"
            enableBackground="new 0 0 512 512"
            height="20"
            viewBox="0 0 512 512"
            width="20"
          >
            <g>
              <path d="m330.274 0-10.607 10.607c-24.914 24.914-28.585 63.132-11.047 91.987l-107.305 72.504-1.856-1.856c-40.939-40.939-107.553-40.94-148.492 0l-10.607 10.606 133.289 133.289-173.649 173.65 21.213 21.213 173.649-173.65 133.29 133.29 10.607-10.607c40.94-40.94 40.939-107.553 0-148.492l-1.856-1.856 72.504-107.305c28.855 17.539 67.073 13.868 91.987-11.047l10.606-10.606zm-3.187 428.148-243.235-243.235c29.104-19.248 68.783-16.069 94.394 9.541l139.3 139.3c25.61 25.611 28.789 65.29 9.541 94.394zm-11.791-139.07-92.374-92.374 105.496-71.281 58.159 58.159zm101.245-117.958-75.66-75.66c-13.828-13.828-16.758-34.491-8.789-51.216l135.665 135.665c-16.725 7.969-37.388 5.039-51.216-8.789z" />
            </g>
          </svg>
        )}
      </td>
    </tr>
  );
};
