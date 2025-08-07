import { addAuthorDesign } from "@/actions/author-design";
import { TAuthorDesign } from "@/actions/author-design/types";
import { TDesignPipeline } from "@/actions/design-pipeline/types";
import { TDesign } from "@/actions/designs/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSubmitForm } from "@/hooks/useSubmit";
import Axios from "@/lib/utils/axios";
import { Loader2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import FileManager from "./FileManager";

const FileSubmitForm = ({
  requirement,
  price,
  formType,
  onOpenChange,
}: {
  requirement: TDesignPipeline;
  price: number;
  formType: string;
  onOpenChange: (value: boolean) => void;
}) => {
  const [loader, setLoader] = useState(false);
  const [productData, setProductData] = useState<
    Partial<
      TDesign & {
        status: string;
        price: number;
        author_id: string;
        pipeline_id: string;
      }
    >
  >({
    author_id: requirement.author_id,
    pipeline_id: requirement.pipeline_id,
    title: requirement.title,
    price: price,
    thumbnail: "",
    previews: [""],
    category: requirement.category,
    type: requirement.type,
    files: [],
    status: "pending",
  });

  // delete preview file
  const handleDeletePreviewFile = async (index: number) => {
    // delete preview file from bucket
    try {
      if (!productData.previews) {
        console.error("No previews available");
        return;
      }

      const encodedKey = encodeURIComponent(productData.previews[index]);
      const res = await Axios.delete(`bucket/delete/${encodedKey}`);

      if (res.status === 200) {
        setProductData((prev) => ({
          ...prev,
          previews: prev.previews?.filter((_, i) => i !== index) || [],
        }));
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setProductData((prev) => ({
          ...prev,
          previews: prev.previews?.filter((_, i) => i !== index) || [],
        }));
      } else {
        console.error("Error deleting preview file:", error);
      }
    }
  };

  // handle form submit
  const { action } = useSubmitForm<TAuthorDesign>(addAuthorDesign, {
    onSuccess: () => {
      setLoader(false);
      setProductData({
        title: requirement.title,
        thumbnail: "",
        previews: [""],
        category: requirement.category,
        type: requirement.type,
        files: [],
        status: "pending",
      });
      onOpenChange(false);
    },
    onError: () => {
      setLoader(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    // @ts-ignore
    await action(productData);
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="mb-4 lg:col-6">
        <Label>Thumbnail</Label>
        <FileManager
          enable={productData.category && productData.type ? true : false}
          existingFile={productData?.thumbnail}
          folder={`design/${productData.category}/${productData.type}/thumbnail`}
          maxSize={800 * 1024}
          permission="public-read"
          classNames="pb-20 pt-16"
          setFile={(location: any) =>
            setProductData((prev) => ({ ...prev, thumbnail: location }))
          }
        />
      </div>

      <div className="mb-4 lg:col-6">
        <div className="mb-4">
          <Label>Figma File</Label>
          <FileManager
            enable={productData.category && productData.type ? true : false}
            existingFile={
              productData?.files?.find((item) => item.type === "figma")?.file
            }
            folder={`design/${productData.category}/${productData.type}/figma`}
            maxSize={100 * 1024 * 1024}
            permission="private"
            setFile={(location: string) => {
              if (!location) return;
              setProductData((prev) => ({
                ...prev,
                files: [...prev.files!, { file: location, type: "figma" }],
              }));
            }}
          />
        </div>
        <div className="mb-4">
          <Label>Figma Code</Label>
          <FileManager
            enable={productData.category && productData.type ? true : false}
            existingFile={
              productData?.files?.find((item) => item.type === "figma_code")
                ?.file
            }
            folder={`design/${productData.category}/${productData.type}/figma_code`}
            maxSize={5 * 1024 * 1024}
            permission="private"
            setFile={(location: string) => {
              if (!location) return;
              setProductData((prev) => ({
                ...prev,
                files: [...prev.files!, { file: location, type: "figma_code" }],
              }));
            }}
          />
        </div>
      </div>

      <div className="mb-4 lg:col-12">
        <div className="mb-2 flex items-center justify-between">
          <Label className="mb-0">Previews</Label>
          <Button
            type="button"
            onClick={() =>
              setProductData((prev) => ({
                ...prev,
                previews: prev.previews ? [...prev.previews, ""] : [""],
              }))
            }
            size={"sm"}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Preview
          </Button>
        </div>

        <div className="rounded bg-dark p-4">
          <div className="grid grid-cols-3 gap-4 rounded">
            {productData?.previews?.map((item, index) => (
              <div key={index} className="rounded-sm bg-background p-2">
                {/* file name */}
                <div className="mb-2 flex items-center">
                  <p className="line-clamp-1 max-w-[80%] text-sm">
                    {item.split("/").pop()}
                  </p>
                  <Button
                    className="ml-auto px-2"
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePreviewFile(index)}
                  >
                    <Minus />
                  </Button>
                </div>
                <FileManager
                  enable={
                    productData.category && productData.type ? true : false
                  }
                  existingFile={item}
                  folder={`design/${productData.category}/${productData.type}/preview`}
                  maxSize={1 * 1024 * 1024}
                  permission="public-read"
                  setFile={(location: any) =>
                    setProductData((prev) => {
                      const updatedPreviews = prev.previews
                        ? [...prev.previews]
                        : [];
                      updatedPreviews[index] = location;
                      return { ...prev, previews: updatedPreviews };
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* for Insert */}
      {formType === "insert" && (
        <div className="col-12 text-right">
          <Button
            className="self-end"
            disabled={
              loader ||
              !productData.thumbnail ||
              productData.files?.length !== 2 ||
              productData.previews?.findIndex((item) => item === "") !== -1
            }
          >
            {loader ? (
              <>
                Please wait
                <Loader2 className="ml-2 inline-block h-4 w-4 animate-spin" />
              </>
            ) : (
              "Add Now"
            )}
          </Button>
        </div>
      )}

      {/* for Update */}
      {formType === "update" && (
        <div className="col-12 text-right">
          <Button
            className="self-end"
            disabled={
              loader ||
              !productData.thumbnail ||
              productData.files?.length !== 2 ||
              productData.previews?.findIndex((item) => item === "") !== -1
            }
          >
            {loader ? (
              <>
                Please wait
                <Loader2 className="ml-2 inline-block h-4 w-4 animate-spin" />
              </>
            ) : (
              "Update Now"
            )}
          </Button>
        </div>
      )}
    </form>
  );
};

export default FileSubmitForm;
