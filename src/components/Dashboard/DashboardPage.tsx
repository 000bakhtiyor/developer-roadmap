import { useEffect, useState } from 'react';
import { httpGet } from '../../lib/http';
import { useToast } from '../../hooks/use-toast';
import { useStore } from '@nanostores/react';
import { $teamList } from '../../stores/team';
import type { TeamListResponse } from '../TeamDropdown/TeamDropdown';
import { DashboardTabButton } from './DashboardTabButton';
import { PersonalDashboard, type BuiltInRoadmap } from './PersonalDashboard';
import { TeamDashboard } from './TeamDashboard';
import { getUser } from '../../lib/jwt';
import { useParams } from '../../hooks/use-params';
import { cn } from '../../../editor/utils/classname';

type DashboardPageProps = {
  builtInRoleRoadmaps?: BuiltInRoadmap[];
  builtInSkillRoadmaps?: BuiltInRoadmap[];
  builtInBestPractices?: BuiltInRoadmap[];
  isTeamPage?: boolean;
};

export function DashboardPage(props: DashboardPageProps) {
  const {
    builtInRoleRoadmaps,
    builtInBestPractices,
    builtInSkillRoadmaps,
    isTeamPage = false,
  } = props;

  const currentUser = getUser();
  const toast = useToast();
  const teamList = useStore($teamList);

  const { t: currTeamId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeamId, setSelectedTeamId] = useState<string>();

  async function getAllTeams() {
    if (teamList.length > 0) {
      return;
    }

    const { response, error } = await httpGet<TeamListResponse>(
      `${import.meta.env.PUBLIC_API_URL}/v1-get-user-teams`,
    );
    if (error || !response) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    $teamList.set(response);
  }

  useEffect(() => {
    getAllTeams().finally(() => {
      if (currTeamId) {
        setSelectedTeamId(currTeamId);
      }

      setIsLoading(false);
    });
  }, [currTeamId]);

  const userAvatar =
    currentUser?.avatar && !isLoading
      ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${currentUser.avatar}`
      : '/images/default-avatar.png';

  return (
    <>
      <div
        className={cn('bg-[#151b2e] py-5', {
          'striped-loader-slate': isLoading,
        })}
      >
        <div className="container flex flex-wrap items-center gap-1.5">
          <DashboardTabButton
            label="Personal"
            isActive={!selectedTeamId && !isTeamPage}
            href="/dashboard"
            avatar={userAvatar}
          />

          {!isLoading && (
            <>
              {teamList.map((team) => {
                const { avatar } = team;
                const avatarUrl = avatar
                  ? `${import.meta.env.PUBLIC_AVATAR_BASE_URL}/${avatar}`
                  : '/images/default-avatar.png';
                return (
                  <DashboardTabButton
                    key={team._id}
                    label={team.name}
                    isActive={team._id === selectedTeamId}
                    {...(team.status === 'invited'
                      ? {
                          href: `/respond-invite?i=${team.memberId}`,
                        }
                      : {
                          href: `/team?t=${team._id}`,
                        })}
                    avatar={avatarUrl}
                  />
                );
              })}
              <DashboardTabButton
                label="+ Create Team"
                isActive={false}
                href="/team/new"
                className="border border-dashed border-slate-700 bg-transparent px-3 text-[13px] text-sm text-gray-500 hover:border-solid hover:border-slate-700 hover:text-gray-400"
              />
            </>
          )}
        </div>
      </div>

      <div className="">
        {!selectedTeamId && !isTeamPage && (
          <div className="min-h-screen pb-20">
            <PersonalDashboard
              builtInRoleRoadmaps={builtInRoleRoadmaps}
              builtInSkillRoadmaps={builtInSkillRoadmaps}
              builtInBestPractices={builtInBestPractices}
            />
          </div>
        )}

        {(selectedTeamId || isTeamPage) && (
          <div className="container">
            <TeamDashboard
              builtInRoleRoadmaps={builtInRoleRoadmaps!}
              builtInSkillRoadmaps={builtInSkillRoadmaps!}
              teamId={selectedTeamId!}
            />
          </div>
        )}
      </div>
    </>
  );
}

function DashboardTabSkeleton() {
  return (
    <div className="h-[30px] w-[114px] animate-pulse rounded-md border bg-white"></div>
  );
}
