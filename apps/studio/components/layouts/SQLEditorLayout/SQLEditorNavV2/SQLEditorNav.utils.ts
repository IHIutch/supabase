import { SnippetFolderResponse } from 'data/content/sql-folders-query'

export interface TreeViewItemProps {
  id: string | number
  name: string
  parent: number | null
  children: any[]
  metadata?: any
}

export const ROOT_NODE = { id: 0, name: '', parent: null, children: [] }

export const formatFolderResponseForTreeView = (
  response?: SnippetFolderResponse
): TreeViewItemProps[] => {
  if (response === undefined) return [ROOT_NODE]

  const { folders, contents } = response
  const formattedFolders =
    folders?.map((folder) => {
      const { id, name } = folder
      return { id, name, parent: 0, isBranch: true, children: [], metadata: folder }
    }) || []
  const formattedContents =
    contents?.map((content) => {
      const { id, name } = content
      return { id, name, parent: 0, children: [], metadata: content }
    }) || []

  const root = {
    id: 0,
    name: '',
    parent: null,
    children: [
      ...(folders || [])?.map((folder) => folder.id),
      ...(contents || [])?.map((content) => content.id),
    ],
  }

  return [root, ...formattedFolders, ...formattedContents]
}
