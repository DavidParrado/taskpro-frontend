'use client';
import { useEffect, useState } from 'react';
import { TeamModal } from '@/components';
import { ITeam } from '@/interfaces';
import { createTeam, deleteTeam, getTeamsByUser, updateTeam } from '@/actions';
import { getDecodedToken, getToken } from '@/utils/authHelpers';

const TeamsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<ITeam | undefined>();
  const [teams, setTeams] = useState<ITeam[]>([]);


  const openCreateTeamModal = () => {
    setCurrentTeam(undefined); // Reset the team data for creating a new one
    setIsModalOpen(true);
  };

  const openEditTeamModal = (team: any) => {
    setCurrentTeam(team); // Load the selected team into the modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Fetch teams from the server
    const decoded = getDecodedToken();
    getTeamsByUser(decoded!.user.id, getToken() || "").then((teams) => {
      console.log(teams);
      setTeams(teams);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  const handleCreateTeam = async (data: any) => {
    // Send the new team data to the server
    const decoded = getDecodedToken();
    const response = await createTeam({ ...data, leaderId: decoded?.user.id }, getToken() || "");
    if (response) {
      setTeams((teams) => [response, ...teams]);
    }
    closeModal();
  };

  const handleUpdateTeam = async (teamId: string, data: any) => {
    // Send the updated team data to the server
    const response = await updateTeam(teamId, data, getToken() || "");
    if (response) {
      setTeams((teams) => teams.map((team) => team.id === response.id ? response : team));
    }
    closeModal();
  };

  const handleDeleteTeam = async (teamId: string) => {
    // Send the team ID to the server to delete it
    const response = await deleteTeam(teamId, getToken() || "");
    if (response) {
      setTeams((teams) => teams.filter((team) => team.id !== teamId));
    }
    closeModal();
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Teams</h2>
      <button
        onClick={openCreateTeamModal}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
      >
        Create Team
      </button>

      <div className="mt-8">
        <ul>
          {teams.map((team) => (
            <li key={team.id} className="p-4 mb-4 bg-gray-100 dark:bg-trueGray-800 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold dark:text-white ">{team?.name}</h3>
                  <p className="text-gray-600 dark:text-gray-100">Project: <span className='dark:text-gray-300'>{team?.project?.name}</span></p>
                  <p className="text-gray-600 dark:text-gray-100">Collaborators: <span className='dark:text-gray-300'>{team?.collaborators?.map(collab => collab.user.name)?.join(", ")}</span></p>
                </div>
                <button
                  onClick={() => openEditTeamModal(team)}
                  className="px-4 py-2 text-white bg-green-500 rounded"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Team Modal for creating or editing */}
      {isModalOpen && (
        <TeamModal
          isOpen={isModalOpen}
          onClose={closeModal}
          team={currentTeam}
          handleSubmitTeam={handleCreateTeam}
          handleDeleteTeam={handleDeleteTeam}
          handleUpdateTeam={handleUpdateTeam}
        />
      )}
    </div>
  );
};

export default TeamsPage;
