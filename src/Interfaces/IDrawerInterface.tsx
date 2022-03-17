export interface IDrawerInterface {
    isDrawerOpen: boolean
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
    drawerWidth: string
}