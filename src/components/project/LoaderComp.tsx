import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

function LoaderComp({ className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("loading flex justify-center items-center", className)}>
      <Loader color="red" />
    </div>
  );
}

export default LoaderComp;
