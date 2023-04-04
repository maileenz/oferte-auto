import { type NextPage } from "next";
import Head from "next/head";
import { type ChangeEvent, useCallback, useState } from "react";
import { env } from "~/env.mjs";
import type { MediaFile } from "~/types";
import { uploader } from "~/utils/upload";
import _ from "lodash";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { z } from "zod";
import { FuelType, TransmissionType } from "@prisma/client";
import FsLightbox from "fslightbox-react";
import { FormControl } from "~/components/form-control";
import { zodResolver } from "@hookform/resolvers/zod";
import { withSessionSsr } from "~/server/session";
import { useRouter } from "next/router";

const Create: NextPage = () => {
  const router = useRouter();

  const [media, setMedia] = useState<MediaFile[]>([]);

  const [toggle, setToggle] = useState(false);

  const create = api.products.create.useMutation({
    onSuccess() {
      toast.success("Successfully added!");
      void router.push("/admin/products");
    },
  });

  const schema = z.object({
    description: z.string(),
    make: z.string(),
    model: z.string(),
    year: z.string(),
    engineSize: z.string(),
    mileage: z.string(),
    transmission: z.nativeEnum(TransmissionType),
    fuel: z.nativeEnum(FuelType),
    price: z.string(),
  });

  const { watch, register, handleSubmit } = useForm<{
    description: string;
    make: string;
    model: string;
    year: string;
    engineSize: string;
    mileage: string;
    transmission: TransmissionType;
    fuel: FuelType;
    price: string;
  }>({
    resolver: zodResolver(schema),
  });

  const submitForm = (data: {
    description: string;
    make: string;
    model: string;
    year: string;
    engineSize: string;
    mileage: string;
    transmission: TransmissionType;
    fuel: FuelType;
    price: string;
  }) => {
    create.mutate({ ...data, media });
  };

  const handleFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files;

      if (files) {
        const uploads: MediaFile[] = await toast.promise(
          Promise.all(_.map(files, async (file) => await uploader(file))),
          {
            loading: `Uploading ${files.length} file${
              files.length > 1 ? "s" : ""
            }`,
            success: `File${files.length > 1 ? "s" : ""} uploaded 👌`,
            error: "Upload failed 🤯",
          }
        );

        setMedia((state) => [...state, ...uploads]);
      }
    },
    [setMedia]
  );

  return (
    <>
      <Head>
        <title>Create {env.NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form
        className="card flex flex-col gap-3 bg-white shadow-sm"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="card-body pt-4">
          <button className="btn-red btn" type="submit">
            Submit
          </button>
          <FormControl label="Price">
            <label className="input-group">
              <input
                type="text"
                pattern="[0-9]*"
                placeholder="Price"
                className="input-bordered input w-full"
                {...register("price")}
              />
            </label>
          </FormControl>
          <FormControl label="Make">
            <select className="select-bordered select" {...register("make")}>
              <option disabled selected>
                Select
              </option>
              <option>Mercedes-Benz</option>
              <option>Audi</option>
              <option>Bmw</option>
            </select>
          </FormControl>
          <FormControl label="Model">
            <input
              type="text"
              placeholder="Model"
              className="input-bordered input w-full"
              disabled={!watch("make")}
              {...register("model")}
            />
          </FormControl>
          <FormControl label="Year">
            <input
              type="text"
              pattern="[0-9]*"
              placeholder="Fabrication year"
              className="input-bordered input w-full"
              {...register("year")}
            />
          </FormControl>
          <FormControl label="Description">
            <textarea
              className="textarea-bordered textarea"
              placeholder="Description"
              {...register("description")}
            ></textarea>
          </FormControl>
          <FormControl label="Mileage">
            <label className="input-group">
              <input
                type="text"
                pattern="[0-9]*"
                placeholder="Mileage"
                className="input-bordered input w-full"
                {...register("mileage")}
              />
              <span>km</span>
            </label>
          </FormControl>
          <FormControl label="Engine size">
            <label className="input-group">
              <input
                type="text"
                pattern="[0-9]*"
                placeholder="Cylinder capacity"
                className="input-bordered input w-full"
                {...register("engineSize")}
              />
              <span>L</span>
            </label>
          </FormControl>
          <FormControl label="Fuel">
            <select
              className="select-bordered select w-full"
              {...register("fuel")}
            >
              <option disabled selected>
                Select
              </option>
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
            </select>
          </FormControl>
          <FormControl label="Transmission">
            <select
              className="select-bordered select w-full"
              {...register("transmission")}
            >
              <option disabled selected>
                Select
              </option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </FormControl>

          <div>Media files</div>

          {media.length > 0 ? (
            <div
              className="carousel-center carousel rounded-box space-x-4"
              onClick={() => setToggle(!toggle)}
            >
              {media.map(({ url }, i) => (
                <div className="carousel-item" key={url}>
                  <img
                    src={url}
                    alt={`Image ${i}`}
                    className="rounded-box max-h-[300px] object-cover"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <FsLightbox
            toggler={toggle}
            sources={media.map((item) => item.url)}
          />

          <input
            type="file"
            className="file-input-bordered file-input w-full"
            onChange={void handleFileUpload}
            multiple
          />

          <div>Add options</div>
        </div>
      </form>
    </>
  );
};

export const getServerSideProps = withSessionSsr(({ req }) => {
  const { authId } = req.session;

  if (!authId) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  }

  return {
    props: {},
  };
});

export default Create;
