import { FC } from 'react'
import * as I from '../../assets'

interface IProps {
    type: string
    fill?: string
    color?: string
    size?: number
    className?: string
}
interface AssetParam {
    name: string,
    value: JSX.Element
}
export const Icon: FC<IProps> = ({
    type ,
    fill,
    color,
    size = 18,
    className = '',
    ...props
}): JSX.Element  => {
    type = type.charAt(0).toUpperCase() + type.slice(1)

    if (!type) {
        console.log('invalid <Icon/> type')
        return <span>invalid {`<Icon/>`} type</span>
    }
    return <div></div>
    // const Custom =Object.is(I,I) && I.hasOwnProperty(type) && I[type as keyof AssetParam]

    // if (fill) {
    //     return <Custom className={className}
    //         width={size}
    //         height={size}
    //         fill={fill}
    //         stroke={color}
    //         {...props}
    //     />
    // }

    // return <Custom className={className}
    //     width={size}
    //     height={size}
    //     stroke={color}
    //     {...props}
    // />

}

export default Icon
