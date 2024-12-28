import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
export default function EditArticleDialog({ isOpen, onClose, onUpdate, data }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
    pdfFile: null,
  });

  useEffect(() => {
    if (data) {
      setForm({
        ...data,
      });
    }
  }, [data]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setForm((prevForm) => ({
        ...prevForm,
        [name]: file,
      }));
    }
  };

  const handleSubmit = () => {
    if (!form.title || !form.description || !form.author) {
      alert("Please fill all fields before submitting!");
      return;
    }
    onUpdate({
      ...form,
      pdfFile: form.pdfFile ? form.pdfFile : data.pdfFile,
    });

    setForm({
      title: "",
      description: "",
      author: "",
      pdfFile: null,
    });
    onClose();
  };

  if (!form) {
    return <div>Loading</div>;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Title Input */}
            <div>
              <Label htmlFor="title" className="block text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter Article title"
              />
            </div>{" "}
            <div>
              <Label htmlFor="author" className="block text-sm font-medium">
                Author
              </Label>
              <Input
                id="author"
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Author name"
              />
            </div>{" "}
            <div>
              <Label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </Label>
              <Textarea
                placeholder="Enter description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            {/* PDF File Upload */}
            <div>
              <Label htmlFor="pdfFile" className="block text-sm font-medium">
                PDF File
              </Label>
              <Input
                id="pdfFile"
                type="file"
                name="pdfFile"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              {form.pdfFile && (
                <div className="mt-2">
                  <Label className="block text-sm font-medium">
                    PDF Preview
                  </Label>
                  <a
                    href={URL.createObjectURL(form.pdfFile)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    View PDF
                  </a>
                </div>
              )}
            </div>
            <Button className="w-full mt-4" onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
