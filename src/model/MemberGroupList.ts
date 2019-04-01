import { MemberList } from './MemberList'
import { MemberGroup } from './MemberGroup'

export class MemberGroupList extends Array<MemberGroup> {

  public memberGroupFromGid (gid: number): MemberGroup | null {
    const tmp = this.filter(x => x.id === gid)
    return tmp.length !== 0 ? tmp[0] : null
  }
}
