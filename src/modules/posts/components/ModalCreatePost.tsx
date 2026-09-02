import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFetchUserList } from "@/hooks/useApi";

interface ModalCreatePostProps {
  isOpen: boolean;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (data: { title: string; id: number; body: string }) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  id: Yup.number()
    .min(1, "Create by is required")
    .required("Create by is required"),
  body: Yup.string().required("Body is required"),
});

export const ModalCreatePost = ({
  isOpen,
  isSubmitting = false,
  onCancel,
  onSubmit,
}: ModalCreatePostProps) => {
  const { data: userData } = useFetchUserList();
  const formik = useFormik({
    initialValues: {
      title: "",
      id: 0,
      body: "",
    },
    validationSchema,
    onSubmit,
  });

  const handleCancel = () => {
    formik.resetForm();
    onCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      onCancel={handleCancel}
      title="Create Post"
      onSubmit={formik.handleSubmit}
      submitText="Create"
      disabled={isSubmitting}
    >
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">
            Title <span className="text-red-500">*</span>
          </Label>

          <Input
            id="title"
            name="title"
            placeholder="Enter post title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.title && formik.errors.title && (
            <span className="text-sm text-red-500">{formik.errors.title}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="userId">
            Create By <span className="text-red-500">*</span>
          </Label>
          <select
            id="id"
            name="id"
            value={formik.values.id}
            onChange={(e) => {
              formik.setFieldValue("id", Number(e.target.value));
            }}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value={0}>Select user</option>
            {userData?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {formik.touched.id && formik.errors.id && (
            <span className="text-sm text-red-500"> {formik.errors.id} </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="body">
            Body <span className="text-red-500">*</span>
          </Label>

          <Textarea
            id="body"
            name="body"
            placeholder="Enter post content"
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.body && formik.errors.body && (
            <span className="text-sm text-red-500">{formik.errors.body}</span>
          )}
        </div>
      </form>
    </Modal>
  );
};
