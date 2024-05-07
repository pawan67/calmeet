import { UserButton, UserProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default SettingsPage;
