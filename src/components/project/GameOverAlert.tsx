import { KeyedMutator } from "swr";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogPortal,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";

function GameOverAlert({
  openGameOverAlert,
  setOpenGameOverAlert,
  score,
  setScore,
  setTextAreaVal,
  mutate,
}: {
  score: number;
  openGameOverAlert: boolean;
  setOpenGameOverAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setTextAreaVal: React.Dispatch<React.SetStateAction<string>>;
  mutate: KeyedMutator<any>;
}) {
  return (
    <div className="game-over">
      <AlertDialog open={openGameOverAlert} onOpenChange={setOpenGameOverAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Game Over</AlertDialogTitle>
            <AlertDialogDescription>
              Final Score - {score} wpm
              {/* <Badge variant={"outline"}> Final Score - {score} wpm</Badge> */}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cursor-pointer"
              onClick={async () => {
                setScore(0);
                setTextAreaVal("");
                mutate();
              }}
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default GameOverAlert;
