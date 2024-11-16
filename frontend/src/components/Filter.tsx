import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import PopoverFilter from "./PopoverFilter";
import { Context } from "../context/Context";
import { useContext } from "react";
import Button from "./Button";
import { Subject } from "../types/model";
import CheckIcon from "@mui/icons-material/Check";
import { orderOptions } from "../types/filter";

const orderOptionsMapped = [
  {
    id: 0,
    name: orderOptions.DUE_DATE
  }, 
  {
    id: 1,
    name: orderOptions.CREATION_DATE
  }
];

export default function Filter() {
  const {
    subjects,
    setSelectedFilter,
    selectedFilter,
    selectedOrder,
    setSelectedOrder,
  } = useContext(Context);

  const onClickFilter = (subject: Subject) => {
    if (selectedFilter === subject.id) {
      setSelectedFilter("");
      return;
    }
    setSelectedFilter(subject.id);
  };

  const onClickOrder = (order: string) => {
    if (selectedOrder === order) {
      setSelectedOrder("");
      return;
    }
    setSelectedOrder(order);
  };

  return (
    <div>
      <div className="p-4 flex items-center gap-2">
        <PopoverFilter
          options={subjects.map((subject) => (
            <div className="flex items-center gap-2" key={subject.id}>
              <Button
                onClick={() => onClickFilter(subject)}
                variant="tertiary"
                key={subject.id}
              >
                {subject.name} - {subject.teacherName}
              </Button>
              {selectedFilter === subject.id && <CheckIcon fontSize="small" />}
            </div>
          ))}
        >
          <FilterListIcon />
        </PopoverFilter>
        <PopoverFilter
          options={orderOptionsMapped.map((orderOption, index) => (
            <div className="flex items-center gap-2" key={orderOption.id}>
              <Button
                onClick={() => onClickOrder(orderOption.name)}
                variant="tertiary"
                key={index}
              >
                {orderOption.name}
              </Button>
              {selectedOrder === orderOption.name && <CheckIcon fontSize="small" />}
            </div>
          ))}
        >
          <SwapVertIcon />
        </PopoverFilter>
      </div>
    </div>
  );
}
