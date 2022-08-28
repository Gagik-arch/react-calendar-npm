import { FC } from 'react'
import * as I from '../../assets/icons'
interface IProps {
    type: string
    fill?: string
    color?: string
    size?: number
    className?: string
}

export const Icon: FC<IProps> = ({
    type ,
    fill,
    color = '#94a3b8',
    size = 18,
    className = '',
    ...props
}): JSX.Element  => {
    type = type.charAt(0).toUpperCase() + type.slice(1)

    if (!type || !I[type]) {
        console.log('invalid <Icon/> type')
        return <>invalid {`<Icon/>`} type</>
    }
    const Custom = I[type]

    if (fill) {
        return <Custom className={className}
            width={size}
            height={size}
            fill={fill}
            stroke={color}
            {...props}
        />
    }

    return <Custom className={className}
        width={size}
        height={size}
        stroke={color}
        {...props}
    />

}

export default Icon
