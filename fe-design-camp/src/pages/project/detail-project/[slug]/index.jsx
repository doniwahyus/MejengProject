import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { AiFillLike, AiFillHeart, AiFillEye } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiAlertCircle } from "react-icons/fi";
import CommentInput from "./comment-input";
import CommentList from "./comment-list";

export default function ProjectDetails() {
  const router = useRouter();
  const slug = router.query.slug;

  const datas = {
    author: "Nicko Ilham",
    authorImage: "https://ui-avatars.com/api/?background=random",
    category: "Mobile Application",
    region: "Soloraya",
    country: "Indonesia",
    title: "Mobile Application for Plant Businesses",
    tools: ["React", "Next.js", "Tailwind CSS"],
    thumbnail: "https://picsum.photos/seed/pasdmaa/600/325",
    description: `
    <p>
      In today's digital era, having a strong online presence is crucial for
      businesses. This includes having an <b>e-commerce platform</b> and a
      mobile application to make it easier for customers to access products
      and services. For businesses that sell plants and gardening products,
      having a mobile application is especially important as it allows
      customers to browse through a wide selection of plants and make
      purchases on-the-go. With the convenience of a mobile application,
      customers can place orders, track deliveries, and receive
      notifications on new products and special offers. 👨‍🌾🌼🌺🌻🌱 <br /> By
      making the shopping experience more convenient and personalized, a
      mobile application can help a plant business stand out in a
      competitive market and attract new customers.😇😁☺👌
    </p>`,
    image1: "https://picsum.photos/seed/asdacwa/700/300",
    image2: "https://picsum.photos/seed/cwa/700/300",
    image3: "",
    totalLike: 140,
    totalView: 350,
    date: "08 March 2023",
  };

  const accountData = {
    name: "Nicko Ilham",
    profile_image: "https://ui-avatars.com/api/?background=random",
  };

  const commentsData = [
    {
      id: 1,
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      user: {
        name: "Warto Gito",
        profile_image: "https://ui-avatars.com/api/?background=random",
      },
      replies: [],
    },
    {
      id: 2,
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      user: {
        name: "Togito",
        profile_image: "https://ui-avatars.com/api/?background=random",
      },
      replies: [],
    },
    {
      id: 3,
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      user: {
        name: "Ilham bocil",
        profile_image: "https://ui-avatars.com/api/?background=random",
      },
      replies: [],
    },
  ];

  return (
    <section>
      <h1 className="pb-7 text-3xl font-bold uppercase text-primary">
        {datas.title} {slug}
      </h1>

      <div className="flex items-center justify-start gap-2 pb-3">
        <Image
          width={32}
          height={32}
          src={datas.authorImage}
          className="rounded-full"
          alt={datas.author}
        />
        <p
          className="w-[150px] truncate text-left font-semibold"
          title={datas.author}
        >
          {datas.author}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Image
          src={datas.thumbnail}
          alt="Uploaded file"
          width={500}
          height={500}
          className="h-full w-full rounded-xl object-cover"
        />
        <div className="px-12 py-5 text-xl ">
          <div
            dangerouslySetInnerHTML={{
              __html: datas.description,
            }}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <Image
            src={datas.image1}
            alt="Uploaded file"
            width={500}
            height={500}
            className="h-full w-full rounded-xl object-cover"
          />
          {datas.image2 && (
            <Image
              src={datas.image2}
              alt="Uploaded file"
              width={500}
              height={500}
              className="h-full w-full rounded-xl object-cover"
            />
          )}
          {datas.image3 && (
            <Image
              src={datas.image3}
              alt="Uploaded file"
              width={500}
              height={500}
              className="h-full w-full rounded-xl object-cover"
            />
          )}
          <div className="flex w-full flex-col items-center justify-center gap-8 bg-[#122341] p-16 text-white">
            <h3 className="text-2xl font-semibold capitalize">{datas.title}</h3>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80">
              <AiFillLike size={18} /> Appreciate
            </button>
            <div className="flex items-center justify-center gap-2 font-medium">
              <p className="pr-5">Published : {datas.date}</p>
              <div className="flex items-center justify-center gap-1 text-sm text-white">
                <button>
                  <AiFillHeart className="h-5 w-5 transition-all duration-300 hover:text-gray-300" />
                </button>
                <p>{datas.totalLike}</p>
              </div>
              <div className="flex items-center justify-center gap-1 text-sm text-white">
                <AiFillEye className="h-5 w-5 transition-all duration-300 hover:text-gray-300" />
                <p>{datas.totalView}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="flex w-full items-start justify-center gap-4 pt-7">
        {/* Comment Field */}
        <div className="w-full border p-10">
          <CommentInput authorImage={datas.authorImage} author={datas.author} />

          <hr className="my-10" />

          {/* Comment List */}
          <div className="flex w-full items-center justify-start">
            {commentsData.length === 0 ? (
              <p className="text-[#B5B5B5]">
                there are no comments on this post yet...
              </p>
            ) : (
              <div className="flex flex-col items-start justify-center gap-5">
                {commentsData.map((comment) => (
                  <CommentList
                    key={comment.id}
                    profile_image={comment.user.profile_image}
                    name={comment.user.name}
                    body={comment.body}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="flex w-1/3 flex-col items-center justify-center gap-4 ">
          <div className="flex w-full flex-col items-start justify-center gap-4 border p-4">
            <h1 className="text-sm font-bold text-[#656470]">OWNER</h1>
            <div className="flex items-center justify-center gap-2">
              <Image
                width={45}
                height={45}
                src={datas.authorImage}
                className="rounded-full"
                alt={datas.author}
              />
              <div>
                <p
                  className="w-[150px] truncate text-left text-lg font-semibold"
                  title={datas.author}
                >
                  {datas.author}
                </p>
                <p className="inline-flex items-center justify-center text-sm font-medium text-[#9F9F9F]">
                  <MdLocationPin /> {datas.region}, {datas.country}
                </p>
              </div>
            </div>
            <Link
              href="/user/profile"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-primary p-2 text-white transition-all duration-300 hover:border-primary/80 hover:bg-primary/80 hover:text-white"
            >
              <CgProfile className="h-4 w-4" />
              View Profile
            </Link>
          </div>

          <div className="flex w-full flex-col items-start justify-center gap-3 border p-4">
            <h1 className="font-bold">{datas.title}</h1>
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-center gap-1 text-sm text-[#B5B5B5]">
                <button>
                  <AiFillHeart className="h-4 w-4 transition-all duration-300 hover:text-secondary" />
                </button>
                <p className="font-medium">{datas.totalLike}</p>
              </div>
              <div className="flex items-center justify-center gap-1 text-sm text-[#B5B5B5]">
                <AiFillEye className="h-4 w-4 transition-all duration-300 hover:text-secondary" />
                <p className="font-medium">{datas.totalView}</p>
              </div>
            </div>
            <p className="text-sm text-[#B5B5B5]">Published {datas.date}</p>
            <Link
              href="/user/profile"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-primary/10 p-2 transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <FiAlertCircle className="h-4 w-4" />
              Report This Project
            </Link>
          </div>

          <div className="flex w-full flex-col items-start justify-center gap-5 border p-4">
            <div className="flex flex-col gap-2 text-sm">
              <h1 className="text-sm font-bold text-[#656470]">CATEGORY</h1>
              <p className="font-semibold">{datas.category}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <h1 className="font-bold text-[#656470]">TOOLS</h1>
              {datas.tools.map((tool, index) => (
                <p key={index} className="font-semibold">
                  {tool}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
