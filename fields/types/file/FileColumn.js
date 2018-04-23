import React from 'react';

import ItemsTableCell from '../../components/ItemsTableCell';
import ItemsTableValue from '../../components/ItemsTableValue';

var LocalFileColumn = React.createClass({
	renderValue: function () {
		var value = this.props.data.fields[this.props.col.path];
		if (!value || !value.filename) return;
		return value.filename;
	},
	render: function () {
		var value = this.props.data.fields[this.props.col.path];
		var href = value && value.url ? value.url : null;
		var label = value && value.filename ? value.filename : null;
		// check if file type is image
		if(value && value.mimetype) {
			console.log(this.props);
			if(this.props.col.file.type == "image") {
				
				label = <img src={'/'+this.props.col.file.path+'/'+label} width={this.props.col.file.width} height={this.props.col.file.height} />;
			}
		}
		return (
			<ItemsTableCell href={href} padded interior field={this.props.col.type}>
				<ItemsTableValue>
					{label}
				</ItemsTableValue>
			</ItemsTableCell>
		);
	},
});

module.exports = LocalFileColumn;
