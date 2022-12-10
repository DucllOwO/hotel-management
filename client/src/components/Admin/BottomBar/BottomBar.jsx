import React from "react";
import "./bottombar.css";

const BottomBar = (props) => {
  return (
    <div className="bottomBar">
      {props.children}
      {/* <div>
        {props.add && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              props.onAddProduct();
            }}
          >
            {" "}
            Add{" "}
          </Button>
        )}
      </div> */}
      {/* <div>
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button type="primary" className="createBtn">
          Create
        </Button>
      </div> */}
    </div>
  );
};

export default BottomBar;
