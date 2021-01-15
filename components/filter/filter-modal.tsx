import { FilterData } from "../../contracts/data";
import Modal from "react-bootstrap/Modal";

export function FilterModal(props: {
  title: string;
  data: FilterData[];
  show: boolean;
  onHide: Function;
}) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="font-bold text-lg">
          {props.title.replace("_", " ")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {props.data.slice(0, 10).map((item) => (
            <div key={item.key}>
              <span className="font-semibold">{item.key}</span>
              <span className="ml-3 text-sm text-gray-400">
                {item.doc_count}
              </span>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
