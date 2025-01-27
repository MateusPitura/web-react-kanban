import AttachFileIcon from "@mui/icons-material/AttachFile";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import { format } from "date-fns";
import { Status } from "../types/model";
import Button from "./Button";
interface ColumnItemProperties {
  id: string;
  course: string;
  teacher: string | null;
  dueDate: Date | null;
  text: string;
  createdAt: Date;
  attachments: number | null;
  link: string;
  status: Status;
}

export default function ColumnItem({
  id,
  course,
  teacher,
  dueDate,
  text,
  createdAt,
  attachments,
  link,
  status,
}: ColumnItemProperties) {
  const onClickRedirect = () => {
    const linkParts = link.split("classroom.google.com/");
    const linkFormatted = `${linkParts[0]}classroom.google.com/u/1/${linkParts[1]}`;
    window.open(linkFormatted, "_blank");
  };

  return (
    <div
      className="bg-surfaceBright p-4 rounded-lg grid grid-cols-12 grid-rows-4 gap-2 cursor-pointer border-2 hover:border-onSurface border-surfaceBright shadow-lg h-40 m-2 my-draggable"
      id={`${status}-${id}`}
      draggable={true}
    >
      <div className="col-span-8">
        <div className="bg-primary w-fit px-1 rounded-lg text-onPrimary line-clamp-1 overflow-hidden text-ellipsis">
          {course} - {teacher}
        </div>
      </div>
      <div className="col-span-4">
        <div className="flex justify-end items-center gap-2 text-onSurface">
          {dueDate && (
            <>
              <ScheduleIcon fontSize="small" />
              <div>
                {format(dueDate, "dd/MM")} {format(dueDate, "E")}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="col-span-full row-span-2 text-onSurface">
        <div className="line-clamp-2 overflow-hidden text-ellipsis">{text}</div>
      </div>
      <div className="col-span-4">
        <div className="text-outline">
          {format(createdAt, "dd/MM")} {format(createdAt, "E")}
        </div>
      </div>
      <div className="col-span-4">
        <div className="flex justify-start items-center gap-2 text-outline">
          {attachments && (
            <>
              <AttachFileIcon fontSize="small" />
              <div>{attachments}</div>
            </>
          )}
        </div>
      </div>
      <div className="col-span-4">
        <Button variant="secondary" onClick={onClickRedirect}>
          <ShortcutIcon fontSize="small" />
        </Button>
      </div>
    </div>
  );
}
