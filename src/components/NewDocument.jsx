import React from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useEffect } from "react";

function NewDocument({
	title = "Notification",
	content = "Sample notification content",
}) {
	return (
		<div className="text-center p-5">
			<h3>{title}</h3>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
				reiciendis laboriosam. Ipsam rerum voluptatum commodi nostrum tempore
				asperiores, aspernatur quaerat laborum perspiciatis. Quam omnis maiores
				aliquam. Voluptate facere modi minima.
			</p>
		</div>
	);
}

NewDocument.propTypes = {};

export default NewDocument;
