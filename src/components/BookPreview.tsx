'use client';
import {Dispatch, SetStateAction, ReactElement} from 'react';
import {DocumentLoadEvent, Viewer} from '@react-pdf-viewer/core';
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot
} from '@react-pdf-viewer/default-layout';
import {Book as BookModel} from '@/types/onstord';

interface BookModalProps {
  setNumPages: Dispatch<SetStateAction<number>>;
  onClose?: React.DispatchWithoutAction;
  book: BookModel;
}

export default function BookPreview({setNumPages, book}: BookModalProps) {
  const bookUrl = new URL(book.url);
  bookUrl.protocol = 'https:';
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          ShowSearchPopover,
          GoToPreviousPage,
          CurrentPageInput,
          NumberOfPages,
          GoToNextPage,
          ZoomOut,
          CurrentScale,
          ZoomIn
        } = slots;
        return (
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='px-1'>
                <ShowSearchPopover />
              </div>
            </div>

            <div className='flex items-center'>
              <div className='px-1'>
                <GoToPreviousPage />
              </div>
              <div className='px-1 w-12'>
                <CurrentPageInput />
              </div>
              <div className='px-1'>
                {'/ '}
                <NumberOfPages />
              </div>
              <div className='px-1'>
                <GoToNextPage />
              </div>
            </div>

            <div className='flex items-center'>
              <div className='px-1'>
                <ZoomOut />
              </div>
              <div className='px-1'>
                <CurrentScale />
              </div>
              <div className=''>
                <ZoomIn />
              </div>
            </div>
          </div>
        );
      }}
    </Toolbar>
  );
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: defaultTabs => []
  });
  return (
    <>
      <Viewer
        fileUrl={bookUrl.href}
        onDocumentLoad={(e: DocumentLoadEvent) => {
          setNumPages(e.doc.numPages);
        }}
        plugins={[defaultLayoutPluginInstance]}
      />
    </>
  );
}
