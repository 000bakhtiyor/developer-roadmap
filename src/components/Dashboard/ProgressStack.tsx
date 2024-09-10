import { ArrowUpRight } from 'lucide-react';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';
import type { ProjectStatusDocument } from '../Projects/ListProjectSolutions';
import { DashboardBookmarkCard } from './DashboardBookmarkCard';
import { DashboardProjectCard } from './DashboardProjectCard';
import { useState } from 'react';
import { cn } from '../../lib/classname';
import { DashboardProgressCard } from './DashboardProgressCard';
import { useStore } from '@nanostores/react';
import { $accountStreak, type StreakResponse } from '../../stores/streak';

type ProgressStackProps = {
  progresses: UserProgress[];
  projects: (ProjectStatusDocument & {
    title: string;
  })[];
  accountStreak?: StreakResponse;
  isLoading: boolean;
  topicDoneToday: number;
};

const MAX_PROGRESS_TO_SHOW = 5;
const MAX_PROJECTS_TO_SHOW = 8;
const MAX_BOOKMARKS_TO_SHOW = 8;

type ProgressLaneProps = {
  title: string;
  linkText?: string;
  linkHref?: string;
  isLoading?: boolean;
  loadingSkeletonCount?: number;
  loadingSkeletonClassName?: string;
  children: React.ReactNode;
};

function ProgressLane(props: ProgressLaneProps) {
  const {
    title,
    linkText,
    linkHref,
    isLoading = false,
    loadingSkeletonCount = 4,
    loadingSkeletonClassName = '',
    children,
  } = props;

  return (
    <div className="h-full rounded-md border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs uppercase text-gray-500">{title}</h3>

        {linkText && linkHref && (
          <a
            href={linkHref}
            className="flex items-center gap-1 text-xs text-gray-500"
          >
            <ArrowUpRight size={12} />
            {linkText}
          </a>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {isLoading && (
          <>
            {Array.from({ length: loadingSkeletonCount }).map((_, index) => (
              <CardSkeleton key={index} className={loadingSkeletonClassName} />
            ))}
          </>
        )}
        {!isLoading && children}
      </div>
    </div>
  );
}

export function ProgressStack(props: ProgressStackProps) {
  const { progresses, projects, isLoading, accountStreak, topicDoneToday } =
    props;

  const bookmarkedProgresses = progresses.filter(
    (progress) =>
      progress?.isFavorite &&
      progress?.done === 0 &&
      progress?.learning === 0 &&
      progress?.skipped === 0,
  );

  const userProgresses = progresses.filter((progress) => !progress?.isFavorite);

  const [showAllProgresses, setShowAllProgresses] = useState(false);
  const userProgressesToShow = showAllProgresses
    ? userProgresses
    : userProgresses.slice(0, MAX_PROGRESS_TO_SHOW);

  const [showAllProjects, setShowAllProjects] = useState(false);
  const projectsToShow = showAllProjects
    ? projects
    : projects.slice(0, MAX_PROJECTS_TO_SHOW);

  const [showAllBookmarks, setShowAllBookmarks] = useState(false);
  const bookmarksToShow = showAllBookmarks
    ? bookmarkedProgresses
    : bookmarkedProgresses.slice(0, MAX_BOOKMARKS_TO_SHOW);

  const totalProjectFinished = projects.filter(
    (project) => project.repositoryUrl,
  ).length;

  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        <StatsCard
          title="Current Streak"
          value={accountStreak?.count || 0}
          isLoading={isLoading}
        />
        <StatsCard
          title="Topics Done Today"
          value={topicDoneToday}
          isLoading={isLoading}
        />
        <StatsCard
          title="Projects Finished"
          value={totalProjectFinished}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-2 grid min-h-[330px] grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        <ProgressLane
          title={'Your Expertise'}
          isLoading={isLoading}
          loadingSkeletonCount={5}
        >
          {userProgressesToShow.length > 0 && (
            <>
              {userProgressesToShow.map((progress) => {
                return (
                  <DashboardProgressCard
                    key={progress.resourceId}
                    progress={progress}
                  />
                );
              })}
            </>
          )}

          {userProgresses.length > MAX_PROGRESS_TO_SHOW && (
            <ShowAllButton
              showAll={showAllProgresses}
              setShowAll={setShowAllProgresses}
              count={userProgresses.length}
              maxCount={MAX_PROGRESS_TO_SHOW}
              className="mt-3"
            />
          )}
        </ProgressLane>

        <ProgressLane
          title={'Projects'}
          isLoading={isLoading}
          loadingSkeletonClassName={'h-5'}
          loadingSkeletonCount={8}
        >
          {projectsToShow.map((project) => {
            return (
              <DashboardProjectCard key={project.projectId} project={project} />
            );
          })}

          {projects.length > MAX_PROJECTS_TO_SHOW && (
            <ShowAllButton
              showAll={showAllProjects}
              setShowAll={setShowAllProjects}
              count={projects.length}
              maxCount={MAX_PROJECTS_TO_SHOW}
              className="mt-3"
            />
          )}
        </ProgressLane>

        <ProgressLane
          title={'Bookmarks'}
          isLoading={isLoading}
          loadingSkeletonClassName={'h-5'}
          loadingSkeletonCount={8}
          linkHref={'/roadmaps'}
          linkText={'Explore'}
        >
          {bookmarksToShow.map((progress) => {
            return (
              <DashboardBookmarkCard
                key={progress.resourceId}
                bookmark={progress}
              />
            );
          })}
          {bookmarkedProgresses.length > MAX_BOOKMARKS_TO_SHOW && (
            <ShowAllButton
              showAll={showAllBookmarks}
              setShowAll={setShowAllBookmarks}
              count={bookmarkedProgresses.length}
              maxCount={MAX_BOOKMARKS_TO_SHOW}
              className="mt-3"
            />
          )}
        </ProgressLane>
      </div>
    </>
  );
}

type ShowAllButtonProps = {
  showAll: boolean;
  setShowAll: (showAll: boolean) => void;
  count: number;
  maxCount: number;
  className?: string;
};

function ShowAllButton(props: ShowAllButtonProps) {
  const { showAll, setShowAll, count, maxCount, className } = props;

  return (
    <button
      className={cn(
        'flex w-full items-center justify-center text-sm text-gray-500 hover:text-gray-700',
        className,
      )}
      onClick={() => setShowAll(!showAll)}
    >
      {!showAll ? <>+ show {count - maxCount} more</> : <>- show less</>}
    </button>
  );
}

type CardSkeletonProps = {
  className?: string;
};

function CardSkeleton(props: CardSkeletonProps) {
  const { className } = props;

  return (
    <div
      className={cn(
        'h-10 w-full animate-pulse rounded-md bg-gray-100',
        className,
      )}
    />
  );
}

type StatsCardProps = {
  title: string;
  value: number;
  isLoading?: boolean;
};

function StatsCard(props: StatsCardProps) {
  const { title, value, isLoading = false } = props;

  return (
    <div className="flex flex-col gap-1 rounded-md border bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-xs uppercase text-gray-500">{title}</h3>
      {isLoading ? (
        <CardSkeleton className="h-8" />
      ) : (
        <span className="text-2xl font-medium text-black">{value}</span>
      )}
    </div>
  );
}
