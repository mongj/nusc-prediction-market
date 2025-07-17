import { useEffect, useState } from "react";
import { toast } from "sonner";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { APIResponse, api } from "@/api";
import Header from "@/components/Header";
import { Button, Chip } from "@/components/primitives";
import { User } from "@/types";

// Confirmation dialog before resetting password
function ConfirmResetDialog({
  open,
  handleClose,
  handleConfirm,
}: {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}) {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          maxWidth: "400px",
          width: "100%",
        },
      }}
    >
      <div className="relative">
        <div className="absolute right-4 top-4 flex items-center justify-center">
          <IconButton
            onClick={handleClose}
            size="small"
            className="flex items-center justify-center p-1"
            aria-label="close"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-bold text-red-800 mb-4 pb-2 border-b border-gray-200">
            Confirm Reset
          </h3>
          <div className="flex flex-col space-y-4">
            <p>
              Are you sure you want to reset this user's password? This will generate a new temporary password.
            </p>
            <div className="flex gap-2 justify-end">
              <Button text="Cancel" variant="secondary" onClick={handleClose} size="small" />
              <Button text="Confirm" color="red" onClick={handleConfirm} size="small" />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

function ResetDialog({ open, onClose, tempPassword }: { open: boolean; onClose: () => void; tempPassword: string }) {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          maxWidth: "400px",
          width: "100%",
        },
      }}
    >
      <div className="relative">
        <div className="absolute right-4 top-4 flex items-center justify-center">
          <IconButton
            onClick={onClose}
            size="small"
            className="flex items-center justify-center p-1"
            aria-label="close"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4 pb-2 border-b border-gray-200">
            Temporary Password
          </h3>
          <div className="flex flex-col space-y-4">
            <div>
              <p className="mb-2 text-gray-700">Give this password to the participant:</p>
              <div className="rounded-lg bg-gray-100 px-4 py-2 text-lg font-mono text-center select-all border border-gray-200">
                {tempPassword}
              </div>
            </div>
            <p className="text-sm text-gray-500 italic">
              The participant will be required to change this password on next login.
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

function AdminResetPasswordPage() {
  const [allParticipants, setAllParticipants] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [tempPassword, setTempPassword] = useState("");
  const itemsPerPage = 10;

  const fetchUsers = () => {
    setIsLoading(true);
    api
      .get<APIResponse<Record<string, User>>>("/users")
      .then((res) => {
        const usersArray = Object.values(res.data.data);
        // Only show participants who need password reset
        const participantUsers = usersArray.filter(
          (user) => !user.isAdmin && user.participant?.needPasswordReset
        );
        setAllParticipants(participantUsers);
      })
      .catch((error) => {
        console.error("Error fetching users:", error.response || error);
        toast.error("Failed to fetch participants. You may not have admin privileges.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Show confirm dialog first
  const handleResetPassword = (userId: number) => {
    setSelectedUserId(userId);
    setConfirmDialogOpen(true);
  };

  // Called when admin confirms in dialog
  const handleConfirmReset = () => {
    if (!selectedUserId) return;
    setConfirmDialogOpen(false);
    api
      .post(`/users/${selectedUserId}/reset-password`)
      .then((res) => {
        setTempPassword(res.data.data.tempPassword);
        setResetDialogOpen(true);
        toast.success("Password reset successfully!");
        fetchUsers();
      })
      .catch(() => {
        toast.error("Failed to reset password.");
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentParticipants = allParticipants.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allParticipants.length / itemsPerPage);

  return (
    <div className="flex min-h-screen w-full flex-col place-items-center justify-start gap-3 sm:gap-5 bg-gray-100 p-4 sm:p-16">
      <ConfirmResetDialog
        open={confirmDialogOpen}
        handleClose={() => setConfirmDialogOpen(false)}
        handleConfirm={handleConfirmReset}
      />
      <ResetDialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)} tempPassword={tempPassword} />
      <div className="w-full max-w-7xl">
        <Header />
        <div className="w-full max-w-[1400px] mt-4 sm:mt-8 bg-white p-6 sm:p-8 rounded-2xl shadow">
          <h1 className="text-2xl font-bold mb-4">Participant Password Management</h1>
          <p className="mb-6 text-gray-600">
            This table shows participants who are required to reset their password.
          </p>
          {isLoading ? (
            <p>Loading participants...</p>
          ) : (
            <div className="overflow-x-auto border border-neutral-300 rounded-lg">
              <table className="min-w-[700px] w-full divide-y divide-neutral-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-2 text-left text-sm font-semibold text-gray-900 sm:pl-6 w-32"
                    >
                      Participant ID
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-2 text-left text-sm font-semibold text-gray-900 w-20"
                    >
                      Actions
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-1 text-left text-sm font-semibold text-gray-900 w-16"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentParticipants.length > 0 ? (
                    currentParticipants.map((user) => (
                      <tr key={user.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-2 text-sm font-medium text-gray-900 sm:pl-6">
                          {user.friendlyId}
                        </td>
                        <td className="whitespace-nowrap py-3 px-2 text-sm text-center align-middle">
                          <Button
                            text="Reset Password"
                            onClick={() => handleResetPassword(user.id)}
                            color="red"
                            size="small"
                            className="w-40 rounded-lg px-0 py-2 font-semibold shadow transition hover:bg-red-600 hover:text-white"
                            style={{ fontSize: "1rem", minWidth: "10rem" }}
                          />
                        </td>
                        <td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
                          <Chip text="Reset Required" color="yellow" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center text-gray-500 sm:pl-6"
                      >
                        No participants found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, allParticipants.length)}
                      </span>{" "}
                      of <span className="font-medium">{allParticipants.length}</span> results
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      text="Previous"
                      size="small"
                    />
                    <Button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      text="Next"
                      size="small"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminResetPasswordPage;