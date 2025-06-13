import {
  BookOpenIcon,
  FileTextIcon,
  MapIcon,
  SparklesIcon,
  type LucideIcon,
} from 'lucide-react';
import { useId, useState } from 'react';
import { FormatItem } from './FormatItem';
import { GuideOptions } from './GuideOptions';

const allowedFormats = ['course', 'guide', 'roadmap'] as const;
type AllowedFormat = (typeof allowedFormats)[number];

export function ContentGenerator() {
  const [title, setTitle] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<AllowedFormat>('course');

  const titleFieldId = useId();

  const allowedFormats: {
    label: string;
    icon: LucideIcon;
    value: AllowedFormat;
  }[] = [
    {
      label: 'Course',
      icon: BookOpenIcon,
      value: 'course',
    },
    {
      label: 'Guide',
      icon: FileTextIcon,
      value: 'guide',
    },
    {
      label: 'Roadmap',
      icon: MapIcon,
      value: 'roadmap',
    },
  ];

  return (
    <form className="mx-auto mt-20 w-full max-w-md space-y-4 rounded-xl bg-white p-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor={titleFieldId}
          className="inline-block text-sm text-gray-500"
        >
          What can I help you learn?
        </label>
        <input
          type="text"
          id={titleFieldId}
          placeholder="Enter a topic"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block h-9 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-500 focus:border-gray-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="inline-block text-sm text-gray-500">
          Choose the format
        </label>
        <div className="grid grid-cols-3 gap-2">
          {allowedFormats.map((format) => {
            const isSelected = format.value === selectedFormat;

            return (
              <FormatItem
                key={format.value}
                label={format.label}
                onClick={() => setSelectedFormat(format.value)}
                icon={format.icon}
                isSelected={isSelected}
              />
            );
          })}
        </div>
      </div>
      <GuideOptions />
      <button
        type="submit"
        className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-black text-sm text-white focus:outline-none"
      >
        <SparklesIcon className="size-4" />
        Generate
      </button>
    </form>
  );
}
