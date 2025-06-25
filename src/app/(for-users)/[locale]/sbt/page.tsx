'use client'

import { useEffect, useState } from 'react'

import 'react-toastify/dist/ReactToastify.css'
import RingLoader from 'react-spinners/RingLoader'
import { ringStyle } from '~/app/constants/styles'

import { Button } from '~/components/custom/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { ToastContainer, toast } from 'react-toastify'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'

import { pinata } from '~/lib/config'
import ImageCropModal from '~/components/ui/ImageCropModal'

export default function SBTBuilderPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const localDict = dict?.daoInfo ?? {}

  let [loading, setLoading] = useState(false)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isCropModalOpen, setIsCropModalOpen] = useState(false)

  const [sbtFiles, setSBTs] = useState<any[]>([])

  const fetchAllSBTs = async () => {
    setLoading(true)
    const file = await pinata.files.public.list().then((files) => {
      setSBTs(files.files)
      console.log(files.files)
    })
    setLoading(false)
    return file
  }

  useEffect(() => {
    fetchAllSBTs()
  }, [])

  useEffect(() => {
    const updateImage = async () => {
      if (!croppedImage) return
      try {
        toast.info(localDict.updatingImage ?? 'Updating image...')

        const response = await fetch(croppedImage as string)
        const blob = await response.blob()
        const timestamp = Date.now()
        const _file = new File([blob], `sbt-image-${timestamp}.png`, {
          type: 'image/png',
        })
        const upload = await pinata.upload.public.file(_file, {
          metadata: {
            name: `sbt-image-${timestamp}.png`,
          },
        })
        toast.success(
          localDict.imageUpdatedSuccessfully ?? 'Image updated successfully'
        )
        fetchAllSBTs()
      } catch (error) {
        console.log(error)
      }
    }

    updateImage()
  }, [croppedImage])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setSelectedImage(reader.result as string)
          setIsCropModalOpen(true)
        }
      }
    }
  }

  return (
    <div className="items-center justify-center flex flex-col m-8 md:m-20 gap-4">
      <div className="w-full flex justify-end">
        <Button
          variant="default"
          onClick={() => {
            const fileInput = document.createElement('input')
            fileInput.type = 'file'
            fileInput.onchange = (e) => {
              const event = e as unknown as React.ChangeEvent<HTMLInputElement>
              handleFileChange(event)
            }
            fileInput.click()
          }}
        >
          {localDict.createSBT ?? 'Create SBT'}
        </Button>
        {selectedImage && isCropModalOpen && (
          <ImageCropModal
            localDict={localDict}
            imageSrc={selectedImage}
            onClose={() => setIsCropModalOpen(false)}
            onCropComplete={(cropped) => setCroppedImage(cropped)}
          />
        )}
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">
          {localDict.sbtList ?? 'SBT List'}
        </h2>
        <div
          className="overflow-x-auto rounded-lg w-full"
          style={{ boxShadow: '0 4px 12px 0 rgba(0,0,0,0.10)' }}
        >
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hidden md:table-row">
                <TableHead className="font-bold w-8">#</TableHead>
                <TableHead className="font-bold">
                  {localDict.name ?? 'Name'}
                </TableHead>
                <TableHead className="font-bold">
                  {localDict.createdAt ?? 'Created At'}
                </TableHead>
                <TableHead className="font-bold">
                  {localDict.actions ?? 'Actions'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sbtFiles && sbtFiles.length > 0 ? (
                sbtFiles.map((file: any, idx: number) => (
                  <TableRow
                    key={file.id}
                    className="hover:bg-gray-50 md:table-row flex flex-col md:flex-row md:items-center"
                    style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
                  >
                    {/* Mobile Card Header */}
                    <TableCell className="md:hidden flex flex-row items-center gap-2 py-2">
                      <span className="font-bold text-gray-500">
                        #{idx + 1}
                      </span>
                      <span className="font-bold">{file.name || '-'}</span>
                    </TableCell>
                    {/* Desktop Index */}
                    <TableCell className="hidden md:table-cell">
                      {idx + 1}
                    </TableCell>
                    {/* Name */}
                    <TableCell className="md:table-cell flex-1 md:flex-none break-words">
                      <span className="md:hidden font-semibold text-gray-500">
                        {localDict.name ?? 'Name'}:{' '}
                      </span>
                      {file.name || '-'}
                    </TableCell>

                    {/* Created At */}
                    <TableCell className="md:table-cell flex-1 md:flex-none">
                      <span className="md:hidden font-semibold text-gray-500">
                        {localDict.createdAt ?? 'Created At'}:{' '}
                      </span>
                      {file.created_at
                        ? new Date(file.created_at).toLocaleString()
                        : '-'}
                    </TableCell>
                    {/* Actions */}
                    <TableCell className="md:table-cell flex-1 md:flex-none">
                      <span className="md:hidden font-semibold text-gray-500">
                        {localDict.actions ?? 'Actions'}:{' '}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => {
                          window.open(
                            `https://orange-elegant-takin-78.mypinata.cloud/ipfs/${file.cid}`,
                            '_blank'
                          )
                        }}
                      >
                        {localDict.view ?? 'View'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-6 px-4 text-center text-gray-500"
                  >
                    {localDict.noSBTsFound ?? 'No SBTs found.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <ToastContainer position="bottom-right" draggable></ToastContainer>
      <RingLoader
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
        color={'#000000'}
        loading={loading}
        cssOverride={ringStyle}
        size={50}
      />
    </div>
  )
}
