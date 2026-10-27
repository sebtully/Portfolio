'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/animate-ui/tabs';
import { Clapperboard, FileVideo, Image as ImageIcon, PenTool, WandSparkles, type LucideIcon } from 'lucide-react';

const videoTools = [{ name: 'Premiere Pro', icon: Clapperboard }, { name: 'Media Encoder', icon: FileVideo }];
const graphicsTools = [{ name: 'After Effects', icon: WandSparkles }, { name: 'Photoshop', icon: ImageIcon }, { name: 'Illustrator', icon: PenTool }];

function ToolList({ tools }: { tools: { name: string; icon: LucideIcon }[] }) {
  return <ul>{tools.map(({ name, icon: Icon }) => <li key={name}><Icon size={20} strokeWidth={1.6} aria-hidden="true" /><span>{name}</span></li>)}</ul>;
}

export function CreativeTools() {
  return (
    <div className="creative-tools">
      <h3>Mine værktøjer</h3>
      <p>Jeg arbejder i Adobe-pakken, især med:</p>
      <Tabs defaultValue="video" className="creative-tabs">
        <TabsList aria-label="Kreative værktøjer" className="creative-tabs-list">
          <TabsTrigger value="video" className="creative-tab">Video</TabsTrigger>
          <TabsTrigger value="graphics" className="creative-tab">Grafik & motion</TabsTrigger>
        </TabsList>
        <TabsContent value="video" className="creative-tab-panel">
          <ToolList tools={videoTools} />
        </TabsContent>
        <TabsContent value="graphics" className="creative-tab-panel">
          <ToolList tools={graphicsTools} />
        </TabsContent>
      </Tabs>
      <noscript><ToolList tools={graphicsTools} /></noscript>
    </div>
  );
}
