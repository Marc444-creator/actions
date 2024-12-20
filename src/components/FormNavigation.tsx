import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NotesSheet } from "./NotesSheet";

export const FormNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center gap-4 mb-6">
        {isNotesOpen ? (
          <>
            <Button 
              variant="outline"
              onClick={() => navigate("/habits")}
            >
              Habits
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/settings")}
            >
              Settings
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
            >
              Tasks
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/for-later")}
            >
              For Later
            </Button>
          </>
        ) : (
          <>
            {location.pathname !== "/" && (
              <Button 
                variant="outline"
                onClick={() => navigate("/")}
              >
                Tasks
              </Button>
            )}
            {location.pathname !== "/habits" && (
              <Button 
                variant="outline"
                onClick={() => navigate("/habits")}
              >
                Habits
              </Button>
            )}
            {location.pathname !== "/settings" && (
              <Button 
                variant="outline"
                onClick={() => navigate("/settings")}
              >
                Settings
              </Button>
            )}
            {location.pathname !== "/for-later" && (
              <Button 
                variant="outline"
                onClick={() => navigate("/for-later")}
              >
                For Later
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setIsNotesOpen(true)}
            >
              Notes
            </Button>
          </>
        )}
      </div>
      <NotesSheet isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />
    </>
  );
};