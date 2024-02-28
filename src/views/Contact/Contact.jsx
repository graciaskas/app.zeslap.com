import React from "react";
import { Link } from "react-router-dom";

export default function Contact({ contact }) {
  const { name, content, subject, email, read } = contact;

  return (
    <div className="rounded p-4 bg-white border mb-3">
      <div className="flex border-bottom relative pb-2">
        <div className="icon_round bg-secondary text-white">
          <i className="fa fa-user" />
        </div>
        <div style={{ marginLeft: "5px", marginTop: "-5px" }}>
          <strong>{name}</strong>
          <small className="block" style={{ fontSize: ".75rem" }}>
            {new Date(contact.createdAt).toLocaleString()}
          </small>
        </div>
        {read ? (
          <small className="absolute top-0 end-0 bg-secondary-light-7 rounded-pill px-2">
            Read
          </small>
        ) : (
          <small className="absolute top-0 end-0 bg-primary-light-7 rounded-pill px-2">
            Not read
          </small>
        )}
      </div>

      <div className="py-3">
        <strong className="mb-2 block" style={{ fontSize: ".85rem" }}>
          Object : {subject.substring(0, 110) + "..."}
        </strong>
        <p style={{ wordBreak: "break-word" }}>
          {content.substring(0, 100) + "..."}
        </p>
        <div className="mt-2">
          <i className="fa fa-envelope" style={{ marginRight: "7px" }} />
          {email}
        </div>
      </div>

      <div className="flex items-center justify-between border-top pt-3">
        <Link
          role={"button"}
          to={"./view?q=" + contact._id}
          className="text-decoration-underline btn-sm bg-primary text-white rounded-pill">
          Read more
        </Link>
      </div>
    </div>
  );
}
