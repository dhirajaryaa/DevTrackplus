import { setProfileOpen } from "@/app/ui/uiReducer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import AvatarUpload from "./AvatarUpload";
import { useRef } from "react";
import { useUpdateProfileMutation } from "@/app/auth/authApi";
import { setUser } from "@/app/auth/authReducer";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ProfileModel() {
  const { profileOpen } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formRef = useRef();
  const [profileUpdate, { isLoading }] = useUpdateProfileMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name"),
      about: formData.get("about"),
    };
    profileUpdate(data)
      .unwrap()
      .then((data) => {
        dispatch(setUser(data));
        toast.success("Profile Update succussful");
      })
      .catch((err) => {
        toast.error(`Profile Update Fail!: ${err.message}`);
      }).finally(()=>dispatch(setProfileOpen()));
  };

  return (
    <Dialog open={profileOpen} onOpenChange={() => dispatch(setProfileOpen())}>
      <DialogContent>
        <form onSubmit={handleSubmit} ref={formRef}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* avatar  */}
            <AvatarUpload />

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={user?.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="about" className="text-right">
                About
              </Label>
              <Textarea
                id={"about"}
                name="about"
                className={"col-span-3 resize-none"}
                defaultValue={user?.about}
              ></Textarea>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {isLoading ? <Loader2 className="animate-spin size-6" /> : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
