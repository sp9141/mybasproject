
import libCom from '../../Common/Library/CommonLibrary';

export default function LAMOffset1Type(context) {
    let pickerValue = libCom.getTargetPathValue(context, '#Control:Offset2TypeLstPkr/#Value');
    return libCom.getListPickerValue(pickerValue);

}
