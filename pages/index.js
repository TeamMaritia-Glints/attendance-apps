import router, { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  console.log('testing purpose')
  if (typeof Storage !== "undefined") {
    router.push("/login");
  }
  return <></>;
}
