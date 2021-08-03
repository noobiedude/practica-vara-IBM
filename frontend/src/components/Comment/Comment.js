import React from "react";
import "../Inspect/Inspect.sass";

function Comment(props) {
  let name = <p> Some error text</p>;
  let typeOf = <p> Some error text</p>;

  if (props.comm.createdBy !== undefined) {
    console.log(props.comm.createdBy)
    const property = Object.values(props.comm.createdBy);
    name = property[3];
    typeOf = property[1];
  }
  return (
    <div class="plx-card silver">
      <div class="pxc-avatar">
        <img
          src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
          alt=""
        />
      </div>
      <div class="pxc-subcard">
        <div class="pxc-title">{props.comm.content}</div>
        <div class="pxc-sub"> {props.comm.createdAt} </div>
        <div class="pxc-feats">
          <span>{props.comm.editedAt}</span>
        </div>
        <div class="pxc-tags">
            
        </div>
        <div class="bottom-row">
          <div class="pxc-info">
            <div class="region">{name} ({typeOf})</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
