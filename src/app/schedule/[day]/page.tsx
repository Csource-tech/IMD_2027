import { redirect } from "next/navigation";

export default async function DayScheduleRedirect({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  redirect(`/en/schedule/${day}`);
}
