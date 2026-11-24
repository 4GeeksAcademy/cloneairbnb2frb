import { Suspense } from 'react';
import DetailPageClient from './client';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

async function DetailPageContent({ params }: DetailPageProps) {
  const { id } = await params;
  return <DetailPageClient id={id} />;
}

export default function DetailPage({ params }: DetailPageProps) {
  return (
    <Suspense fallback={<p>Cargando alojamiento...</p>}>
      <DetailPageContent params={params} />
    </Suspense>
  );
}