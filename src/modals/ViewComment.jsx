const ViewComment = ({ comment, id }) => {
  return (
    <div className="modal fade" id={id}>
      <div className="modal-dialog">
        <div className="modal-content  text-secondary">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fa fa-key badge bg-secondary"></i>
              View comment
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>

          <form action="/api/employees/?action=report" method="post">
            <div className="modal-body">{comment}</div>

            <div className="modal-footer">
              <button className="btn-sm bg-danger text-white" type="submit">
                <i className="fa fa-trash"></i> Delete comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewComment;
