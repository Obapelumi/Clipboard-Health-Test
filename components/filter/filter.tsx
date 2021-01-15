import { useState } from "react";
import { FilterData } from "../../contracts/data";
import { FilterModal } from "./filter-modal";

export default function Filter(props: { title: string; data: FilterData[] }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-3 bg-white mb-4">
      <h4 className="font-bold mb-4 uppercase">
        {props.title.replace("_", " ")}
      </h4>
      {props.data.slice(0, 10).map((item) => (
        <div key={item.key} className="mb-2">
          <span className="font-semibold">{item.key}</span>
          <span className="ml-3 text-sm text-gray-400">{item.doc_count}</span>
        </div>
      ))}
      {props.data.length < 11 ? (
        ""
      ) : (
        <button
          className="text-blue-600 focus:outline-none"
          onClick={() => setShowModal(true)}
        >
          Show more
        </button>
      )}
      <FilterModal
        {...props}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
}
